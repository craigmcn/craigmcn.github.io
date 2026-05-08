# craigmcn.github.io

Personal Jekyll blog hosted on GitHub Pages at https://craigmcn.ca.

## Completed

### 2026-05-08
- **Decap CMS** — added `admin/index.html` + `admin/config.yml`
- **GitHub Actions deploy workflow** — `.github/workflows/deploy.yml`
  - Triggers on push to `main`, daily cron at 12:00 PM PST (`0 20 * * *`), and `workflow_dispatch`
  - Replaces native GitHub Pages builder; enables future-dated scheduled posts
  - Daily cron always rebuilds unconditionally (intentional — Jekyll re-evaluates post dates each build)
- **Pages source switched** to GitHub Actions ✅
- **PRs #25–#29 merged** — CMS, workflow, and Gemfile fix all landed on `main`
  - Root cause of all workflow failures: `Gemfile` was in `.gitignore` and never committed

### 2026-05-11 (this session)
- **Diagnosed Decap CMS PKCE failure** — `auth_type: pkce` silently falls back to Netlify auth in 3.12.2; confirmed no console errors but login opened `api.netlify.com` instead of `github.com`
- **Ruled out** version upgrade (3.12.2 is already latest 3.x), `CMS.init()` + `load_config_file: false` (config loaded but PKCE still not triggered), and Sveltia CMS (no PKCE support per their docs)
- **Switched to Cloudflare Worker OAuth proxy** — Worker at `https://quiet-sunset-3f55.craig-040.workers.dev` handles GitHub OAuth token exchange server-side; `admin/config.yml` now uses `base_url` pointing to the Worker
- **PRs #30–#34 merged** — iterative debugging and final Cloudflare Worker approach all landed
- **CMS login works in Chrome Incognito** ✅ — confirms Worker + config are correct

## Next / In Progress

- **Regular Chrome window not working** — login fails in regular Chrome but works in Incognito; suspected cause is a Chrome extension (ad blocker / privacy extension blocking the OAuth popup or `postMessage`); user is investigating
- **Verify date format** — confirm first CMS-created post uses `-0700` timezone offset style (not `-07:00`) to match existing front matter

## Auth debugging history (for context)

- Decap CMS 3.12.2 ignores `auth_type: pkce` — no errors, just silently uses Netlify auth
- Tried: version bump to `@^3.0.0` (no-op, already latest), `CMS.init()` with inline config (revealed Decap loads both inline + external config, causing duplicate collections error), `load_config_file: false` (fixed the error but PKCE still didn't work), Sveltia CMS (no PKCE support)
- **Final solution**: Cloudflare Worker as OAuth proxy — holds `GITHUB_CLIENT_SECRET` securely, exchanges code for token server-side, sends token back to CMS via `postMessage` handshake

## Key Decisions

- **Decap CMS over Siteleaf** — Siteleaf hit its free-plan page limit immediately
- **Cloudflare Worker over PKCE** — neither Decap CMS nor Sveltia CMS have working PKCE; Worker approach is free (100k req/day), keeps site on GitHub Pages, no Netlify dependency
- **Actions-based deploy over native GitHub Pages builder** — required for daily cron rebuild of scheduled posts
- **`_posts/` root only in CMS** — year subdirectories managed manually via git
- **No editorial workflow** — posts commit directly to `main`; future dates serve as drafts
- **Branch protection does not block CMS** — `enforce_admins: false`; CMS authenticates as repo owner via OAuth

## Post organisation convention

- Current/upcoming posts live at `_posts/` root
- At year-end, previous year's posts are moved into `_posts/YYYY/` and republished
- Moving files between subdirectories does not affect URLs (permalink is `/:title.html`)

## GitHub OAuth App

- App name: `craigmcn.github.io CMS`
- Client ID: `Ov23lidKMfqod2ZIuGyX`
- Callback URL: `https://quiet-sunset-3f55.craig-040.workers.dev/callback`

## Cloudflare Worker

- Worker URL: `https://quiet-sunset-3f55.craig-040.workers.dev`
- Secrets: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (set in Cloudflare dashboard)
- Handles: `GET /auth` (redirect to GitHub), `GET /callback` (token exchange + postMessage back to CMS)
