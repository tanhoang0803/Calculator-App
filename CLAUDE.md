# Calculator App — Claude Instructions

## Project Overview
A browser-based calculator that performs basic arithmetic operations built with vanilla HTML, CSS, and JavaScript (no frameworks or build tools).

## Project Structure
```
Calculator_app/
├── index.html        # Main HTML file with calculator markup
├── style.css         # Styling and layout (grid-based button layout)
├── script.js         # Calculator logic and DOM manipulation
├── CLAUDE.md         # This file
└── README.md         # Project summary
```

## Tech Stack
- **HTML5** — semantic structure, calculator display and buttons
- **CSS3** — grid layout for buttons, flexbox for display, responsive styling
- **Vanilla JavaScript** — event handling, arithmetic logic, display management

## Coding Conventions
- No frameworks, no build tools, no npm — plain files only
- Use `const`/`let`, avoid `var`
- Keep JS functions small and single-purpose
- CSS uses class selectors; avoid inline styles
- Button values are read from `data-*` attributes or `innerText`

## Core Features
- Display showing current input and result
- Buttons: digits 0–9, operators `+ - * /`, decimal `.`, equals `=`, clear `C`
- Chain calculations (result feeds into next operation)
- Handle edge cases: division by zero, multiple decimals, leading zeros

## Key Implementation Notes
- Calculator state: `currentInput`, `previousInput`, `operator`, `shouldResetDisplay`
- `updateDisplay()` — syncs state to the screen element
- `calculate()` — performs the arithmetic and returns result
- Event listeners attached to button container via event delegation (single listener on parent)
- No `eval()` — implement arithmetic explicitly for security

## Development
Open `index.html` directly in a browser — no server needed.
