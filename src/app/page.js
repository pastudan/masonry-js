"use client"; // this is a client component

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const COLUMN_COUNT = 5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  let [cards, setCards] = useState([]);

  function addRandomCard() {
    setCards((cards) => [
      ...cards,
      {
        id: cards.length + 1,
        height: getRandomInt(100, 300),
      },
    ]);
  }

  useEffect(() => {
    setInterval(addRandomCard, 1000);
  }, []);

  const columns = Array.from({ length: COLUMN_COUNT }, () => []);

  // split cards into columns
  cards.forEach((card, index) => {
    columns[index % COLUMN_COUNT].push(card);
  });

  console.log(columns);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Masonry</h1>
      <div className={styles.grid}>
        {columns.map((column, index) => (
          <div key={index} className={styles.column}>
            {column.map((card) => (
              <div
                key={card.id}
                className={styles.card}
                style={{ height: card.height }}
              >
                <h3>{card.id}</h3>
                <div className={styles.cardSubtext}>height {card.height}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
