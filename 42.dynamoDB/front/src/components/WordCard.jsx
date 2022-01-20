import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, initDefs } from "../config";
import Word from "./Word";

export default function WordCard() {
  const [defs, setDefs] = useState(initDefs); //TD -> maybe add loader instead.
  const { word, pos } = useParams();

  useEffect(() => {
    const setDefsAsync = async () => {
      const fullApi = word.toUpperCase() + pos && `/${pos.toLowerCase()}`;
      const { data } = await get(fullApi);
      setDefs((prev) => (data.length ? data : prev)); // TD -> add proper error handler.
    };

    setDefsAsync();
  }, [word, pos]);

  return (
    <>
      <h1>{word}</h1>
      <ol>
        {defs.map((word) => (
          <Word word={word} />
        ))}
      </ol>
    </>
  );
}
