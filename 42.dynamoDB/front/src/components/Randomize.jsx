import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { poses, isChars } from "../config";

export default function Randomize() {
  const [letter, setLetter] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const i = Math.floor(Math.random() * 10);
    const pos = poses[i];
    setUrl(`/pos/${pos}/${letter}`);
  }, [letter]);

  const letterValidatorHandler = ({ target: { value } }) => {
    if (isChars(value)) setLetter(value[0]);
    if (value === "") setLetter("");
  };

  return (
    <>
      <em>randomize a word.</em>
      <br />
      <div>
        <label htmlFor="letter input">
          choose a letter that the random word would start with.
        </label>
        <br />
        <input
          id="letter input"
          type="text"
          value={letter}
          placeholder="optional..."
          maxLength="1"
          onInput={letterValidatorHandler}
        />
      </div>
      <Link to={url}>randomize</Link>
    </>
  );
}
