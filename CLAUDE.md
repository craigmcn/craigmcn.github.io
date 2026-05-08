# craigmcn.github.io

Personal Jekyll blog hosted on GitHub Pages at https://craigmcn.ca.

## Completed (2026-05-08)

- **Decap CMS** — added `admin/index.html` + `admin/config.yml` for browser-based post management
  - Auth via GitHub OAuth (PKCE) — no server required
  - Collection scoped to `_posts/` root only; year subdirectories are intentionally invisible to the CMS
  - Decap CMS pinned to `3.12.2` via unpkg CDN
- **GitHub Actions deploy workflow** — `.github/workflows/deploy.yml`
  - Triggers on push to `main`, daily cron at 12:00 PM PST (`0 20 * * *`), and `workflow_dispatch`
  - Replaces native GitHub Pages builder with Actions-based Jekyll build + deploy
  - Enables future-dated posts to go live automatically (Jekyll excludes future posts by default)
- **PR #25** open on branch `2026-05-11-tainted-love` — includes above plus "Tainted Love" post and 2021–2022 post reorganisation into year subdirectories

## Next / In Progress

- **Merge PR #25**
- **Switch Pages source** — after merging, go to Settings → Pages → Build and deployment → Source → **GitHub Actions** (required before Actions deploy will work)
- **Test Decap CMS** — visit `https://craigmcn.ca/admin/` after deploy; authenticate via GitHub OAuth
- **Verify date format** — confirm first CMS-created post uses `-0700` timezone offset style (not `-07:00`) to match existing front matter

## Key Decisions

- **Decap CMS over Siteleaf** — Siteleaf hit its free-plan page limit immediately; Decap CMS has no page cap and is open source
- **PKCE auth** — client-side OAuth flow, no need for a separate OAuth server or Netlify Identity
- **Actions-based deploy over native GitHub Pages builder** — required to support the daily cron rebuild for scheduled posts; push-to-main publishing behaviour is unchanged
- **`_posts/` root only in CMS** — older posts in year subdirectories (`_posts/2021/`, `_posts/2022/`, etc.) are managed manually via git; CMS is for current/upcoming posts only
- **No editorial workflow** — posts commit directly to `main`; draft management is handled by using future dates

## Post organisation convention

- Current/upcoming posts live at `_posts/` root
- At year-end, previous year's posts are moved into `_posts/YYYY/` and republished
- Moving files between subdirectories does not affect URLs (permalink is `/:title.html`)

## GitHub OAuth App

- App name: `craigmcn.github.io CMS`
- Client ID: `Ov23lidKMfqod2ZIuGyX`
- Callback URL: `https://craigmcn.ca/admin/`
