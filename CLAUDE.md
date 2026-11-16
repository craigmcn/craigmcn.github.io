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

### 2026-06-17
- **Contact form migrated to Formspree** — replaced AWS Lambda + API Gateway mailer (`contact.md`) with Formspree's `@formspree/ajax` widget (pinned version + SRI hash); `formId` derived from the form's `action` URL to avoid duplicating it; honeypot field and no-JS fallback (`action`/`method="POST"`) preserved
- **AWS mailer stack torn down** — Lambda, API Gateway, deployment S3 bucket, and CloudWatch log group all removed after confirming Formspree works in production
- **PR #36** — Formspree migration, plus unrelated README local-dev docs and `.ruby-version`/`.gitignore` housekeeping

### 2026-07-10
- **Fixed broken site search** — `feed.json` built `title`/`excerpt`/`categories`/`tags` via raw Liquid string interpolation instead of JSON-encoding; any post excerpt containing a literal `"` (e.g. the em-dash post's `the "ChatGPT hyphen."`) produced invalid JSON, breaking `search.js`'s `fetch('/feed.json').then(r => r.json())` for every query, not just ones matching that post
  - **Fix**: switched every field to Liquid's `jsonify` filter (proper escaping; also replaces the manual category/tag loops with direct array serialization)
  - **Verified** via `mise exec -- bundle exec jekyll build` (system Ruby is 2.6.10; project needs 3.3.11, available through `mise`) — confirmed `_site/feed.json` parses as valid JSON (1132 posts) and the em-dash excerpt now escapes correctly (`\"ChatGPT hyphen.\"`)
  - Branch: `fix/search`; not yet committed/PR'd

## Next / In Progress

- **Commit + PR the `feed.json` fix** on `fix/search`
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

## CDN (`cdn.craigmcn.ca`)

- Served from **Cloudflare R2** bucket `cdn-craigmcn-ca` via an R2 custom domain (migrated from AWS CloudFront + S3 `s3.craigmcn.ca` on 2026-11-16); posts link to `https://cdn.craigmcn.ca/img/...`
- Upload with the AWS CLI `r2` profile (object read/write token only — bucket settings like CORS must be changed in the dashboard):
  `aws s3 cp <file> s3://cdn-craigmcn-ca/img/ --profile r2 --endpoint-url https://04020f0e4c7ba4d4a71941712d01e1dc.r2.cloudflarestorage.com --cache-control "public, max-age=2592000"`
  - Set `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` if the CLI errors on checksums
- CORS allows GET/HEAD from `https://craigmcn.ca` and `http://127.0.0.1:4000`
- A Cache Rule on the `craigmcn.ca` zone makes the hostname cache-eligible (without it every response was `cf-cache-status: DYNAMIC`)
- Keys are case-sensitive: `img/Samsung_Galaxy_S3_review_01-580-100.jpg` and `.JPG` are both stored (identical content) — macOS downloads collapse them into one file
- Local backup: `~/Web/Archive/cdn-craigmcn-ca` (2026-11-16)
- **Pending cleanup:** remove the alias from and disable CloudFront distribution `E1DMGHEFNCGGE6`, then delete S3 bucket `s3.craigmcn.ca` (rollback until then: re-point the `cdn` CNAME to `dv8b8dkxht4vb.cloudfront.net`); remove test custom domain `cdn-r2.craigmcn.ca`
