# Frontend Portfolio

My personal frontend portfolio — the current home base for the frontend path. Built from scratch with HTML, CSS, and JavaScript, no frameworks.

**Live site:** https://tesidrah.github.io/frontend-portfolio/

## What this is

A one-page portfolio covering who I am, what I know, what I'm still learning, and the real projects I've built so far. This is also my first project using JavaScript — the interactive pieces (nav, form validation, project filter) were built and debugged as part of learning it, not bolted on afterward.

## Features

- **Responsive nav** with a mobile hamburger menu, built with real HTML elements (not an SVG icon) so it can animate into an X later
- **Contact form** with client-side validation — checks that all fields are filled, and that the email is in a valid format, with per-field error messages
- **Project filter**, fully data-driven: each project card carries `data-category` attributes, and the script reads whatever categories exist on the page to build the filter buttons automatically. Adding a new project with a new category doesn't require touching the JavaScript.

## Tech

- HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts (Space Grotesk, Inter, Space Mono)

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
└── README.md
```

## Running locally

Clone the repo and open `index.html` in a browser — no build step, no dependencies.

```bash
git clone https://github.com/TeSidrah/frontend-portfolio.git
cd frontend-portfolio
```

## Where this stands

This is a working, tested v1 — nav, form validation, and the project filter are all functional on mobile and desktop. It's not a finished, static thing though: see [ROADMAP.md](./ROADMAP.md) for what's deliberately deferred and coming next.

## Other work

- [client-brief-01-ceramics-studio](https://github.com/TeSidrah/client-brief-01-ceramics-studio) — a simulated client project, linked from the Projects section above

## Contact

- [LinkedIn](https://www.linkedin.com/in/tarek-elzoghby/)
- [Frontend Mentor](https://www.frontendmentor.io/profile/TeSidrah)