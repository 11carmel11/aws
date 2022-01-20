import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { get, searchErrorHandler } from "../config";
import Word from "./Word";
import BackHome from "./BackHome";
import Loader from "./Loader";

const StyledHeader = styled.h1`
  font-family: system-ui;
  text-align: center;
  color: brown;
  text-decoration: underline;
`;

export default function WordCard() {
  const [defs, setDefs] = useState();
  const { word, pos } = useParams();

  useEffect(() => {
    let fullApi = word.toUpperCase();
    if (!!pos) fullApi += `/${pos}`;

    const setDefsAsync = async () => {
      try {
        const { data } = await get(fullApi);
        setDefs(data);
      } catch (error) {
        searchErrorHandler(
          "Sorry... It seems like something went wrong. Try again later!",
          3000
        );
      }
    };

    setDefsAsync();
  }, [word, pos]);

  if (!defs) return <Loader />;

  return (
    <>
      <BackHome />
      <StyledHeader>{word}</StyledHeader>
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
