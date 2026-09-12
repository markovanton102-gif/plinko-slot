# Bubble Pages

One subfolder per Bubble page, named after the page (e.g. `profile/`,
`feed/`, `groups/`). Each page folder should contain:

- `README.md` — what the page does, who can see it, key states (empty/error/loading)
- `page.png` — full-page screenshot
- `elements.png` — element tree / layout screenshot
- `SEO.md` — SEO spec (see master prompt §21) if the page is public
- `workflows/` — one screenshot per workflow attached to this page's elements

This is inspected before migrating each vertical feature slice — see
`LawSphere_Master_Project_Prompt.txt` §3–4. Do not invent page behavior
that isn't evidenced here.
