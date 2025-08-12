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
  const [farewellMessages, setFarewellMessages] = useState({});

  const wordArr = [...word];
  const alphabet = [...alphabets];

  const gameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const gameLost = wrongGuessCount >= language.length - 1;
  const gameOver = gameLost || gameWon;

  const languages = language.map((l, index) => (
    <span
      key={l.name}
      role="listitem"
      aria-label={`${l.name}${index < wrongGuessCount ? " (lost)" : ""}`}
      className={
        index < wrongGuessCount ? "language-item lost" : "language-item"
      }
      style={{ color: l.color, backgroundColor: l.backgroundColor }}
    >
      {l.name}
    </span>
  ));

  const mapWord = wordArr.map((ch, index) => {
    const revealed = guessedLetters.includes(ch) || gameLost;
    const wasMissed = gameLost && !guessedLetters.includes(ch);

    return (
      <span
        key={index}
        className={clsx("character", wasMissed && "missed-character")}
        aria-label={revealed ? ch : "blank space"}
      >
        {revealed ? ch : ""}
      </span>
    );
  });

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
        disabled={gameOver || isGuessed}
        aria-pressed={isGuessed}
        aria-label={`Letter ${a}${
          isCorrect ? " (correct)" : isWrong ? " (wrong)" : ""
        }`}
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
      setWrongGuessCount((prev) => {
        const newCount = prev + 1;
        setFarewellMessages((msgs) => {
          if (!msgs[newCount]) {
            return {
              ...msgs,
              [newCount]: getFarewellText(language[newCount - 1].name),
            };
          }
          return msgs;
        });

        return newCount;
      });
    }
  }

  function newGame() {
    if (gameOver) {
      setGuessedLetters([]);
      setWord(getRandomWord());
      setWrongGuessCount(0);
      setFarewellMessages({});
    }
  }

  return (
    <main className="content" role="main">
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
        aria-live="polite"
      >
        {wrongGuessCount && !gameOver ? (
          <p>{farewellMessages[wrongGuessCount]}</p>
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

      <section
        className="languages-container"
        role="list"
        aria-label="Programming languages list"
      >
        {languages}
      </section>

      <section className="word-container" aria-label="Word to guess">
        {mapWord}
      </section>

      <section
        className="keyboard-container"
        role="region"
        aria-label="Virtual keyboard"
      >
        {keyboard}
      </section>

      {gameOver && (
        <button
          className="new-game-btn"
          onClick={newGame}
          aria-label="Start a new game"
        >
          New Game
        </button>
      )}
    </main>
  );
}
