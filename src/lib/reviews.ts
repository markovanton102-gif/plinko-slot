export type Review = {
  id: string;
  author: string;
  createdAt: string;
  text: string;
  score: number;
};

export function getInitial(name: string): string {
  const trimmed = name.trim();
  return (trimmed[0] ?? '?').toUpperCase();
}

const avatarColors = ['#7c3aed', '#0d9488', '#2563eb', '#c026d3', '#ea580c'];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (const char of name) hash = (hash + char.charCodeAt(0)) % 997;
  return avatarColors[hash % avatarColors.length];
}

export function formatReviewDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
