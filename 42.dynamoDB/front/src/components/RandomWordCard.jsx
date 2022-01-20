import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notyf } from "notyf";
import { get, initDefs } from "../config";
import Word from "./Word";
import BackHome from "./BackHome";

const notyf = new Notyf({ dismissible: true });

export default function RandomWordCard() {
  const [word, setWord] = useState(initDefs[0]); //TD -> maybe add loader instead.
  const { pos, letter } = useParams();

  useEffect(() => {
    let fullApi = `pos/${pos}`;
    if (letter) fullApi += `?letter=${letter}`;

    const setWordAsync = async () => {
      try {
        const { data } = await get(fullApi);
        setWord(data); // TD -> add proper error handler.
      } catch (_) {
        notyf.error(
          "sorry, but we could not find random word. try again later"
        );
        setTimeout(() => {
          window.location = "/";
        }, 3000);
      }
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
