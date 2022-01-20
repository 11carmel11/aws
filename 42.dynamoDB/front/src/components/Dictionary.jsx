import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Randomize from "./Randomize";

const StyledList = styled.ul`
  list-style-type: disclosure-closed;
  font-family: cursive;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: darkcyan;
  text-transform: lowercase;
`;

export default function Dictionary({ dict }) {
  return (
    <>
      <Randomize />
      <h1>click a word to see definition:</h1>
      <StyledList>
        {dict.map((word) => (
          <li key={nanoid()}>
            <StyledLink to={word !== "loading..." && `/${word}`}>
              {word}
            </StyledLink>
          </li>
        ))}
      </StyledList>
    </>
  );
}
