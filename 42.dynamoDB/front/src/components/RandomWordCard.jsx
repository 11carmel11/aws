import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, searchErrorHandler } from "../config";
import Word from "./Word";
import Loader from "./Loader";
import BackHome from "./BackHome";

export default function RandomWordCard() {
  const [word, setWord] = useState();
  const { pos, letter } = useParams();

  useEffect(() => {
    let fullApi = `pos/${pos}`;
    if (letter) fullApi += `?letter=${letter}`;

    const setWordAsync = async () => {
      try {
        const { data } = await get(fullApi);
        setWord(data);
      } catch (_) {
        searchErrorHandler(
          "Sorry, but we could not find random word. Try again later",
          3000
        );
      }
    };
    setWordAsync();
  }, [letter, pos]);

  if (!word) return <Loader />;
  else
    return (
      <>
        <BackHome />
        <h1>{word.word}</h1>
        <Word word={word} />
      </>
    );
}
