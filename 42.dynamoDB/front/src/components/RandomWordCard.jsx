import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, initDefs } from "../config";
import Word from "./Word";

export default function RandomWordCard({ letter }) {
  const [word, setWord] = useState(initDefs); //TD -> maybe add loader instead.
  const { pos } = useParams();

  useEffect(() => {
    const fullApi = `/pos/${pos}${letter && `?letter=${letter.toUpperCase()}`}`;
    const setWordAsync = async () => {
      const { data } = await get(fullApi);
      setWord(data); // TD -> add proper error handler.
    };
    setWordAsync();
  });

  return (
    <>
      <h1>{word}</h1>
      <Word word={word} />
    </>
  );
}
