import React from "react";

export default function Word({ word }) {
  return (
    <li>
      <h2>
        <u>{word.pos.slice(0, -1)}</u>
      </h2>{" "}
      {/*TD -> convert to <Link/>*/}
      <ul>
        {word.definitions.map((def) => (
          <li>
            <code>{def}</code>
          </li>
        ))}
      </ul>
      {word.synonyms && (
        <>
          <h3>synonyms: </h3>
          <span>{word.synonyms}</span>
        </>
      )}
    </li>
  );
}
