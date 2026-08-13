# Frontend Portfolio

My personal frontend portfolio — the current home base for the frontend path. Built from scratch with HTML, CSS, and JavaScript, no frameworks.

**Live site:** https://tesidrah.github.io/frontend-portfolio/

## What this is

A one-page portfolio covering who I am, what I know, and the real projects I've built so far. This is also my first project using JavaScript — the interactive pieces (nav, form validation, project filter) were built and debugged as part of learning it, not bolted on afterward.

## Features

- **Responsive nav** with a mobile hamburger menu, built with real HTML elements (not an SVG icon) so it can animate into an X
- **Contact form** with client-side validation, real submission via Formspree (async, with proper handling for both rejected and failed requests), and accessible status/error messaging via `aria-live`
- **Project filter**, fully data-driven: each project card carries `data-category` attributes, and the script reads whatever categories exist on the page to build the filter buttons automatically. Adding a new project with a new category doesn't require touching the JavaScript.

## Tech

- HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts (Space Grotesk, Inter, Space Mono)
- Formspree (form submission — no backend of my own)

## Structure
```
frontend-portfolio/
├── index.html
├── css/
│ └── style.css
├── scripts/
│ └── script.js
├── images/
├── ROADMAP.md
├── PROCESS.md
└── README.md
```

## Running locally

Clone the repo and open `index.html` in a browser — no build step, no dependencies.

```bash
git clone https://github.com/TeSidrah/frontend-portfolio.git
cd frontend-portfolio
```

## Where this stands

The mobile and desktop layouts, nav, form, and project filter are all built and working. Since the initial version, the contact form was upgraded from client-side-only validation to a real submission pipeline (Formspree), and accessibility passes have gone into the form's status messaging and the Skills section's structure. It's not a finished, static thing though: see [ROADMAP.md](./ROADMAP.md) for what's deliberately deferred and coming next, and [PROCESS.md](./PROCESS.md) for how this was built — real decisions, real bugs, real fixes.

## Other work

- [client-brief-01-ceramics-studio](https://github.com/TeSidrah/client-brief-01-ceramics-studio) — a simulated client project, linked from the Projects section above

## Contact

- [LinkedIn](https://www.linkedin.com/in/tarek-elzoghby/)
- [Frontend Mentor](https://www.frontendmentor.io/profile/TeSidrah)
