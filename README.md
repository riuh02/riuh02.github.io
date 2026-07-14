# GSLE Lab Homepage (Self-Managed Static Version)

This folder contains a complete static copy of http://gsle.or.kr/
(충남대학교 축산환경특성화대학원), converted from the company-managed
GnuBoard PHP site into plain HTML/CSS/JS that needs **no server, no PHP,
no database** — so it can be hosted for free and edited by anyone.

## Folder structure

```
site/                    ← the whole website (deploy this folder)
  index.html             ← Korean homepage
  sub1_1.html ...        ← static pages (인사말, 연락처, 교육과정, ...)
  bbs/                   ← board pages, converted to static HTML
    board_sub4_3.html    ← 논문 list (page 1); _p2, _p3... = later pages
    board_sub4_3_wr111.html ← individual post (wr_id 111)
    board_sub5_1*.html   ← 공지사항, sub5_2 = 갤러리, sub5_3_b = 뉴스
  eng/                   ← English version of the site
  css/ js/ images/ img/  ← design assets (same as original site)
  data/                  ← uploaded files (gallery photos, attachments)
  skin/                  ← board list/gallery styles
  _mapping.json          ← original URL → local file map (for reference)
```

Board name key: sub2_1 교수소개 · sub3_2 재학생/졸업생 · sub4_3 논문 ·
sub4_4 학술대회 · sub4_5 특허 · sub4_6 수상 · sub5_1 공지사항 ·
sub5_2 갤러리 · sub5_3 뉴스 · sub5_4 자료실 (eng* = English versions).

## Preview locally

```
cd site
python -m http.server 8377
```

Then open http://localhost:8377 in your browser.

## How to update content

Everything is plain HTML. The easiest workflow is to open this folder in
Claude Code and ask, e.g.:

- "Add this new publication to the 논문 board: <paste citation>"
- "Add a notice dated 2026-07-20 titled ... with this text"
- "Add these photos to the gallery" (put the photos in `site/data/` first)

Manual editing works too: copy an existing entry block inside the board
list page (e.g. `bbs/board_sub4_3.html`) and edit the text.

## Publish for free (GitHub Pages)

One-time setup:
1. Create a GitHub account and a repository (e.g. `gsle-homepage`).
2. In this folder: `git init`, commit, and push the `site/` content.
3. Repository → Settings → Pages → deploy from branch.

After every edit: commit + push, and the live site updates in ~1 minute.
(Cloudflare Pages and Netlify work the same way and are also free.)

## Domain

- Free default: `yourname.github.io` (or `*.pages.dev` on Cloudflare).
- To keep **gsle.or.kr**: whoever registered the domain (check with the
  company / 후이즈 whois lookup) must point its DNS to the new host.
  Domain registration itself costs roughly ₩20,000–30,000/year — that is
  the only unavoidable cost.

## Blue theme (2026-07)

The original green design was recolored to a blue palette (primary
#2563eb family): all CSS colors, inline page styles, theme images, and
icons were hue-shifted green→blue; natural photos (cows, pasture,
partner logos, university emblem) were kept original. Subtle hover
animations were added at the end of `css/default.css` ("Blue theme
polish layer" section — edit or delete that block to tune them).

The complete original green version is kept in `backup-original-green/`.
To revert everything: delete `site/` and rename the backup to `site`.

## What was intentionally removed

Server-only features that cannot work on a static site were disabled
(links now go to `#`): admin login, post write/edit forms, comment forms,
board search, and file `download.php` endpoints. Attachments that were
publicly visible are preserved under `data/`.
