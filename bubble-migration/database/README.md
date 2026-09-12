# Bubble Data Types — Database Export

Put the Bubble Data Type CSV exports here (one export per Data Type), plus
any notes on field types, privacy rules, and relationships that aren't
obvious from the CSV headers alone.

This is the source of truth for the Postgres/Supabase schema design —
see `LawSphere_Master_Project_Prompt.txt` §5 for how it maps (e.g. the
`contents` unification of Media/Articles/Live/Products).

Do not commit real user data. If exports contain real user records,
scrub or redact before adding them here, or keep them outside the repo
and only document the schema shape.
