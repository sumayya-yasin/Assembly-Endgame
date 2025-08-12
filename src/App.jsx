import { useState } from "react";
import clsx from "clsx";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import language from "./language.js";
import getFarewellText from "./utils.js";
import getRandomWord from "./words.js";

export default function App() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const { width, height } = useWindowSize();
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  const wordArr = [...word];
  const alphabet = [...alphabets];

  const gameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const gameLost = wrongGuessCount >= language.length - 1;
  const gameOver = gameLost || gameWon;

  const languages = language.map((l, index) => {
    return (
      <span
        key={l.name}
        className={
          index < wrongGuessCount ? "language-item lost" : "language-item"
        }
        style={{ color: l.color, backgroundColor: l.backgroundColor }}
      >
        {l.name}
      </span>
    );
  });

  const mapWord = wordArr.map((ch, index) => (
    <span key={index} className="character">
      {guessedLetters.includes(ch) ? ch : ""}
    </span>
  ));

  const keyboard = alphabet.map((a) => {
    const isGuessed = guessedLetters.includes(a);
    const isWrong = isGuessed && !word.includes(a);
    const isCorrect = isGuessed && word.includes(a);
    return (
      <button
        key={a}
        value={a}
        className={clsx(
          "keyboard-item",
          isWrong && "wrong",
          isCorrect && "correct"
        )}
        disabled={gameOver}
        aria-pressed={isGuessed}
        onClick={handleClick}
      >
        {a}
      </button>
    );
  });

  function handleClick(event) {
    const val = event.target.value;

    if (guessedLetters.includes(val)) return;

    setGuessedLetters((prev) => [...prev, val]);

    if (!word.includes(val)) {
      setWrongGuessCount((prev) => prev + 1);
    }
  }

  function newGame() {
    if (gameOver) {
      setGuessedLetters([]);
      setWord(getRandomWord());
      setWrongGuessCount(0);
    }
  }

  return (
    <main className="content">
      {gameWon && <Confetti width={width - 16} height={height} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section
        className={clsx(
          "message-container",
          gameWon && "won",
          gameLost && "lost",
          wrongGuessCount > 0 && !gameOver && "langLost"
        )}
      >
        {wrongGuessCount && !gameOver ? (
          <p>{getFarewellText(language[wrongGuessCount - 1].name)}</p>
        ) : null}

        {gameLost && (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}
        {gameWon && (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        )}
      </section>

      <section className="languages-container">{languages}</section>

      <section className="word-container">{mapWord}</section>

      <section className="keyboard-container">{keyboard}</section>

      {gameOver && (
        <button className="new-game-btn" onClick={newGame}>
          New Game
        </button>
      )}
    </main>
  );
}
