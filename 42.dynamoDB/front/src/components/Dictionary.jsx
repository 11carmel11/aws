import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Randomize from "./Randomize";

export default function Dictionary({ dict }) {
  return (
    <>
      <Randomize />
      <h1>click a word to see definition:</h1>
      <ul>
        {dict.map((word) => (
          <li key={nanoid()}>
            <Link to={word !== "loading..." && `/${word}`}>{word}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
