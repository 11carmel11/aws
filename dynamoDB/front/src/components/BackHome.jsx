import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.button`
  border: none;
  background: bisque;
  border-radius: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: brown;
`;

export default function BackHome() {
  return (
    <StyledContainer type="button">
      <StyledLink to="/">return to home page</StyledLink>
    </StyledContainer>
  );
}
