import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { get, initDefs } from "../config";
import Word from "./Word";
import BackHome from "./BackHome";

export default function WordCard() {
  const [defs, setDefs] = useState(initDefs); //TD -> maybe add loader instead.
  const { word, pos } = useParams();

  useEffect(() => {
    const setDefsAsync = async () => {
      let fullApi = word.toUpperCase();
      if (!!pos) fullApi += `/${pos}`;

      const { data } = await get(fullApi);
      setDefs((prev) => (data.length ? data : prev)); // TD -> add proper error handler.
    };

    setDefsAsync();
  }, [word, pos]);

  return (
    <>
      <BackHome />
      <h1>{word}</h1>
      <ol>
        {defs.map((word) => (
          <li key={nanoid()}>
            <Word word={word} />
          </li>
        ))}
      </ol>
    </>
  );
}
