# AdmisionPerú (CollegeQuiz)

A practice-quiz frontend for Peruvian university entrance exam prep, in Spanish. Pulls real, filterable exam questions from [ExamAPI](https://github.com/Khmlwugh/examapi).

**Live:** https://admisionperu.heygabo.dev

## Features

- Filter by universidad, materia, and periodo de examen (all optional)
- Instant answer feedback with the correct choice always revealed
- Live progress bar, running score, and a timer
- Full results summary with a per-question breakdown
- Responsive down to phone width (390px)
- Math/chemistry notation rendered with KaTeX

## Stack

React (Vite) · Tailwind CSS v4 · react-katex

## Running locally

```bash
npm install
```

Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:8080
```
(point this at ExamAPI running locally, or `https://examapi.heygabo.dev` to use the live backend)

```bash
npm run dev
```

## Deploying

Static build, deployed on Vercel/Netlify. `VITE_API_BASE_URL` is set in the platform's dashboard (not the committed `.env`) to `https://examapi.heygabo.dev` for production.

## Next up

Rendering for text-block and image-bearing questions is untested with real data (no such questions transcribed yet). A companion daily-puzzle app (`univdle`), sharing most of these components, is planned next.
