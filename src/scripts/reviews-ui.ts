import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  formatReviewDate,
  getAvatarColor,
  getInitial,
  type Review,
} from '../lib/reviews';

type DbComment = {
  id: string;
  author: string;
  body: string;
  score: number;
  created_at: string;
};

const FINGERPRINT_PREFIX = 'review_fp_';

function reviewErrorMessage(error: { code?: string; message?: string }): string {
  if (error.code === 'PGRST205') {
    return 'Таблица comments не создана. Supabase → SQL Editor → выполните supabase/schema.sql → Run.';
  }
  if (error.code === '42501') {
    return 'Нет прав на запись. В SQL Editor снова выполните supabase/schema.sql.';
  }
  if (error.message?.includes('site')) {
    return 'Нужна колонка site: выполните supabase/migration-add-site.sql в SQL Editor.';
  }
  return error.message ?? 'Неизвестная ошибка';
}

function getFingerprint(siteSlug: string): string {
  const key = `${FINGERPRINT_PREFIX}${siteSlug}`;
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

function mapRow(row: DbComment): Review {
  return {
    id: row.id,
    author: row.author,
    text: row.body,
    score: row.score,
    createdAt: row.created_at,
  };
}

function renderList(root: HTMLElement, reviews: Review[]) {
  const list = root.querySelector<HTMLOListElement>('.reviews-list');
  if (!list) return;

  if (reviews.length === 0) {
    list.innerHTML = '<li class="reviews-empty">Пока нет отзывов — будьте первым.</li>';
    return;
  }

  list.innerHTML = reviews
    .map(
      (review) => `
      <li class="review-item" data-id="${review.id}">
        <div class="review-avatar" style="background-color:${getAvatarColor(review.author)}" aria-hidden="true">
          ${getInitial(review.author)}
        </div>
        <div class="review-body">
          <header class="review-meta">
            <strong class="review-author">${escapeHtml(review.author)}</strong>
            <time class="review-date" datetime="${review.createdAt}">
              ${formatReviewDate(review.createdAt)}
            </time>
          </header>
          <p class="review-text">${escapeHtml(review.text)}</p>
          <footer class="review-footer">
            <div class="review-vote" role="group" aria-label="Оценить отзыв">
              <button type="button" class="review-vote-btn" data-vote="1" aria-label="Плюс">+</button>
              <span class="review-vote-score">${review.score}</span>
              <button type="button" class="review-vote-btn" data-vote="-1" aria-label="Минус">−</button>
            </div>
          </footer>
        </div>
      </li>`,
    )
    .join('');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function updateComposeAvatar(avatarEl: HTMLElement, name: string) {
  const trimmed = name.trim();
  avatarEl.textContent = getInitial(trimmed || '?');
  avatarEl.style.backgroundColor = getAvatarColor(trimmed || '?');
}

export function initReviews(root: HTMLElement) {
  const url = root.dataset.supabaseUrl?.trim();
  const key = root.dataset.supabaseKey?.trim();
  const siteSlug = root.dataset.siteSlug?.trim() ?? '';

  const form = root.querySelector<HTMLFormElement>('#review-compose');
  const authorInput = root.querySelector<HTMLInputElement>('#review-author');
  const textInput = root.querySelector<HTMLTextAreaElement>('#review-text');
  const avatarEl = root.querySelector<HTMLElement>('#review-compose-avatar');
  const statusEl = root.querySelector<HTMLElement>('#review-status');

  let comments: Review[] = [];
  let client: SupabaseClient | null = null;

  if (avatarEl) {
    updateComposeAvatar(avatarEl, '');
    authorInput?.addEventListener('input', () => {
      updateComposeAvatar(avatarEl, authorInput.value);
    });
  }

  const setStatus = (message: string, type: 'info' | 'success' | 'error') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.hidden = false;
    statusEl.dataset.type = type;
  };

  const refreshList = () => {
    renderList(root, comments);
  };

  const loadFromDb = async () => {
    if (!client) return;
    let query = client
      .from('comments')
      .select('id, author, body, score, created_at')
      .order('created_at', { ascending: false });

    if (siteSlug) query = query.eq('site', siteSlug);

    const { data, error } = await query;

    if (error) {
      setStatus(reviewErrorMessage(error), 'error');
      return;
    }

    comments = (data as DbComment[]).map(mapRow);
    refreshList();
  };

  if (url && key) {
    client = createClient(url, key);
    void loadFromDb();
  } else if (form) {
    form.querySelector('button[type="submit"]')?.setAttribute('disabled', 'true');
    refreshList();
  } else {
    refreshList();
  }

  root.addEventListener('click', async (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('.review-vote-btn');
    if (!btn || !client) return;

    const item = btn.closest<HTMLElement>('.review-item');
    const commentId = item?.dataset.id;
    const voteValue = Number(btn.dataset.vote);
    if (!commentId || (voteValue !== 1 && voteValue !== -1)) return;

    btn.disabled = true;
    const { error } = await client.rpc('vote_comment', {
      p_comment_id: commentId,
      p_fingerprint: getFingerprint(siteSlug),
      p_value: voteValue,
    });
    btn.disabled = false;

    if (error) {
      setStatus('Не удалось сохранить голос.', 'error');
      return;
    }

    await loadFromDb();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!client) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const author = authorInput?.value.trim() ?? '';
    const body = textInput?.value.trim() ?? '';
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const { error } = await client.from('comments').insert({
      site: siteSlug,
      author,
      body,
    });

    if (submitBtn) submitBtn.disabled = false;

    if (error) {
      setStatus(reviewErrorMessage(error), 'error');
      return;
    }

    form.reset();
    if (avatarEl) updateComposeAvatar(avatarEl, '');
    setStatus('Отзыв опубликован. Спасибо!', 'success');
    await loadFromDb();
  });
}
