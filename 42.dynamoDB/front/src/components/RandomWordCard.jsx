import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, initDefs } from "../config";
import Word from "./Word";
import BackHome from "./BackHome";

export default function RandomWordCard() {
  const [word, setWord] = useState(initDefs[0]); //TD -> maybe add loader instead.
  const { pos, letter } = useParams();

  useEffect(() => {
    let fullApi = `pos/${pos}`;
    if (letter) fullApi += `?letter=${letter}`;

    const setWordAsync = async () => {
      const { data } = await get(fullApi);
      setWord(data); // TD -> add proper error handler.
    };
    setWordAsync();
  }, [letter, pos]);

  return (
    <>
      <BackHome />
      <h1>{word.word}</h1>
      <Word word={word} />
    </>
  );
}
