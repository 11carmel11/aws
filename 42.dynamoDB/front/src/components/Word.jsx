import React from "react";
import { nanoid } from "nanoid";

export default function Word({ word }) {
  return (
    <>
      <h2>
        <u>{word.pos.slice(0, -1)}</u>
      </h2>
      <ul>
        {word.definitions.map((def) => (
          <li key={nanoid()}>
            <em>
              <b>{def}</b>
            </em>
          </li>
        ))}
      </ul>
      {word.synonyms && (
        <>
          <h3>synonyms: </h3>
          <span>{word.synonyms}</span>
        </>
      )}
    </>
  );
}
