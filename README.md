# craigmcn.github.io
Personal website

## Local development

This is a Jekyll site deployed via GitHub Actions to GitHub Pages.

### Prerequisites

- Ruby 3.3 (matches the version pinned in `.ruby-version` and used by the CI workflow). If you use [mise](https://mise.jdx.dev/) or [rbenv](https://github.com/rbenv/rbenv), it'll pick this up automatically; otherwise install Ruby 3.3.x yourself.
- Bundler (`gem install bundler`)
- A working C/C++ toolchain (Xcode Command Line Tools on macOS — `xcode-select --install`) since some gems (e.g. `eventmachine`) compile native extensions.

### Setup

```sh
bundle install
```

### Run locally

```sh
bundle exec jekyll serve
```

This builds the site into `_site/` and serves it at http://localhost:4000 with live rebuilds on file changes.

To also preview future-dated posts (drafts that rely on scheduled publishing) and `_drafts/`:

```sh
bundle exec jekyll serve --future --drafts
```

### Build only (no server)

```sh
bundle exec jekyll build
```

Output goes to `_site/`. The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs the equivalent build on push to `main` and on a daily cron.
