# Valentines Questionnaire

A config-driven Valentine UI built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## Where to edit content

- `src/data/config.ts`
  - `password`: unlock code for the first scene.
  - `intro`: hook scene text + video.
  - `questions`: 10 questions, each with 4 options and memory media.
  - `proposal`: audio + final question text.
  - `snapshot`: title + subtitle for the grid.

## Where to put media

Place all media inside `public/media/` and reference them in `src/data/config.ts` as `/media/...`.

Examples:
- `/public/media/intro.mp4`
- `/public/media/q1_1.jpg`
- `/public/media/proposal.mp3`

Videos autoplay and loop by default. If you use videos inside `memories`, they will autoplay inside the bubbles.

If you want to use the trimmed month folders, keep them under:
`public/chosen_round_videos_trimmed/<month>/<file>.mp4`

For bubble performance, the app can use low-res proxies at:
`public/chosen_round_videos_trimmed_low/<month>/<file>.mp4`

Each question can override its own microcopy under `sceneCopy` inside
`src/data/config.ts`.

## Local development

1. Install deps:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Preview the build:
   `npm run preview`

## GitHub Pages deployment

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. It deploys to Pages on every push to `main`.

Notes:
- The workflow sets `BASE_PATH` to `/<repo-name>/` so Vite builds with the correct base.
- Make sure GitHub Pages is enabled for the repository (Settings → Pages → Source: GitHub Actions).
