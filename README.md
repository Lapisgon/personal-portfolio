# James M. Gabutan | Immersive 3D House Portfolio

A one-page portfolio that opens with a programmatically built 3D house (Three.js + GSAP), then reveals the main site.
Vanilla HTML/CSS/JS. No build step, no backend.

## Structure
```
personal-portfolio/
├── index.html        page markup (intro overlay + all sections)
├── README.md
├── photo.jpg         YOUR photo (add it; see below)
├── css/style.css     themes, layout, animations
├── js/script.js      themes, matrix rain, skill bars, secrets 0/6, hacker mode, enter/replay intro
├── js/interactions.js flip cards, decrypt quirks, favorites, quiz, terminal
├── js/house3d.js     Three.js house, camera tours, cinematic intro
└── assets/           spare folder for extra files
```
Creating by hand in VS Code: make the folder, then `css`, `js`, `assets` inside it, and create each file above and paste its code.

## Add your photo
Put your picture in the project root and name it exactly `photo.jpg` (square crop works best). If it is missing, the site shows a "JG" avatar automatically.

## Run locally
1. Open the folder in VS Code and install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**. (Double-clicking `index.html` also works.)
3. Needs internet once, because Three.js and GSAP load from cdnjs.

## Publish on GitHub Pages
1. Create a GitHub repository, then upload all files (keep `index.html` at the root).
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)` → Save.
3. After a minute your site is at `https://<username>.github.io/<repo>/`.

## Presentation talking points (45-second plan)
1. "The house is my personality map: bedroom = about me, computer room = skills, hobby area = games and anime, living room = favorites, and a secret room."
2. Click **Skip intro** to show you are never trapped, then scroll: photo ring, tagline, skill bars filling.
3. Decrypt a quirk, flip a hobby card, take the quiz, type `help` in the terminal.
4. Show the **Secrets 0/6** counter and switch themes (it remembers your choice).
5. Mention HCI: every feature maps to a principle below. Mention fallbacks: reduced motion, no-WebGL 2D mode, keyboard access.

## HCI principles and where they appear
| Principle | Where |
|---|---|
| Visibility of system status | Intro caption says what the camera is doing; skill bars fill; quiz shows "Question 2 of 5 · Score"; Secrets counter 0/6; toast messages |
| Immediate feedback | Quiz marks right/wrong instantly; terminal replies at once; flips, decrypts, pop animations on favorites |
| Clear affordances | Buttons look like buttons; "tap to flip" and "Click to decrypt" labels; visible focus ring; grab cursor on the house |
| Consistency | One accent-color system, same card/button styles, same theme across 3D UI and site |
| User control and freedom | "Skip intro" is always visible, Esc skips, room buttons, "🏠 House" replays, Pause/Play equalizer, terminal history, quiz retry, hacker mode toggles off |
| Recognition rather than recall | Room buttons and nav bar are always visible; terminal `help` lists commands; secrets list shows locked slots |
| Visual hierarchy | Large name and tagline first, section headings in accent color, glass panels group content |
| Accessibility | Keyboard-operable controls, skip link, ARIA labels/roles, `prefers-reduced-motion` support, readable contrast, 2D fallback |

## Secrets (6)
Tap the photo 3 times · Konami code (↑↑↓↓←→←→ B A) · the faint dot in the hero corner · terminal `sudo`, `sisig` or `42` · click the purple glow outside the house (or "Touch the glow" in the Secret room) · flip the Mobile Legends card 3 times.

## Testing checklist (tick while testing in your browser)
- [ ] Intro plays about 10 s and enters the site on its own
- [ ] "Skip intro" and Esc enter immediately
- [ ] Each room button moves the camera; dragging rotates the house
- [ ] "🏠 House" replays the 3D scene
- [ ] Photo shows in the ring (or JG); 3 taps = hacker mode on, 3 taps = off
- [ ] Skill bars fill on scroll
- [ ] Hobby and interest cards flip
- [ ] Quirks decrypt on click
- [ ] Sisig, Minecraft and 3 Idiots cards react; Pause/Play stops/starts the equalizer
- [ ] Quiz: feedback, score, title, retry
- [ ] Terminal: all 7 commands, ↑/↓ history, unknown command message, easter eggs
- [ ] Secrets reach 6/6 and celebrate
- [ ] Themes change everything and persist after refresh
- [ ] Works on phone width; keyboard Tab reaches everything
- [ ] OS "reduce motion" on: no auto intro, no rain, no flip animation
