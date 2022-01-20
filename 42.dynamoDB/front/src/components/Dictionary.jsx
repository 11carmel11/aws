import React, { useEffect, useState } from "react";
import { get } from "../config";
import { Link } from "react-router-dom";

export default function Dictionary() {
  const [dict, setDict] = useState(["loading..."]);
  useEffect(() => {
    const setDictAsync = async () => {
      const { data } = await get("all");
      setDict(data);
    };
    setDictAsync();
  }, []);
  return (
    <>
      <h1>click a word to see definition:</h1>
      <ul>
        {dict.map((word) => (
          <li>
            <Link to={`/${word}`} />
          </li>
        ))}
      </ul>
    </>
  );
}
