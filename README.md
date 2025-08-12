# Assembly: Endgame

A word-guessing game where you must correctly guess the hidden word before all programming languages are eliminated.

## Live Demo

[Play Now](https://assembly-endgame-dusky.vercel.app/)

## Preview

<p>
  <img src="https://github.com/sumayya-yasin/Assembly-Endgame/blob/main/preview/game_start.png" alt="Game Start" width="400"/>
</p>
<p>
  <img src="https://github.com/sumayya-yasin/Assembly-Endgame/blob/main/preview/game_play.png" alt="Game Play" width="400"/>
</p>
<p>
  <img src="https://github.com/sumayya-yasin/Assembly-Endgame/blob/main/preview/game_won.png" alt="Game Won" width="400"/>
</p>
<p>
  <img src="https://github.com/sumayya-yasin/Assembly-Endgame/blob/main/preview/game_lost.png" alt="Game Lost" width="400"/>
</p>

## Game Rules

- A random word is selected at the start of the game.
- You have 8 attempts to guess all letters correctly.
- Each incorrect guess removes one programming language from the list.
- Guess all letters before running out of attempts to win.
- If you run out of attempts, the correct word is revealed.

## Features

- Random word generation for varied gameplay.
- **Dynamic farewell messages** at each state, providing a fresh and humorous message every time you win, lose, or start a game.
- Confetti animation on victory.
- Quick restart via "New Game" button.
- Automatic reveal of the word on loss.
- Responsive design for desktop and mobile.
- On-screen clickable keyboard.
- Visual feedback for correct and incorrect guesses.

## Tech Stack

- React – UI rendering and state management.
- react-use – Window size tracking for animations.
- react-confetti – Victory animation.
- clsx – Conditional class management.
- Custom hooks and utility functions for game logic.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/assembly-endgame.git
cd assembly-endgame
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the game locally

```bash
npm run dev
```

## Project Structure

```
src/
 ├─ App.jsx          # Main game component
 ├─ utils            # Programming languages list, farewell message generator and Random word generator
 ├─ styles.css       # Game styling
```

## License

MIT License — free to use, modify, and distribute.
