import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { poses, isChars } from "../config";

const StyledContainer = styled.div`
  background: darkgray;
  display: inline-grid;
  text-align: center;
  position: relative;
  left: 20vw;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  background-color: gainsboro;
  border: none;
  border-radius: 20px;
  color: brown;
  text-align: center;
`;

const StyledButton = styled.a`
  color: darkslateblue;
  text-decoration: none;
`;

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
    <StyledContainer>
      <em>randomize a word.</em>
      <div>
        <label htmlFor="letter input">
          choose a letter that the random word would start with.
        </label>
        <br />
        <StyledInput
          id="letter input"
          type="text"
          value={letter}
          placeholder="optional..."
          maxLength="1"
          onInput={letterValidatorHandler}
        />
      </div>
      <StyledButton href={url}>randomize</StyledButton>
    </StyledContainer>
  );
}
