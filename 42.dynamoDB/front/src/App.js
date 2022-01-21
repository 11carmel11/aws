import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "notyf/notyf.min.css";
import Dictionary from "./components/Dictionary";
import WordCard from "./components/WordCard";
import RandomWordCard from "./components/RandomWordCard";
import { get } from "./config";

export default function App() {
  const [dict, setDict] = useState(
    JSON.parse(localStorage.getItem("list")) || null
  );

  useEffect(() => {
    const setDictAsync = async () => {
      const { data } = await get("all");

      setDict(data);
      localStorage.setItem("list", JSON.stringify(data));
    };

    const list = JSON.parse(localStorage.getItem("list"));

    if (!!list) setDict(list);
    else setDictAsync();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dictionary dict={dict} />} />
          <Route path="pos/:pos" element={<RandomWordCard />}>
            <Route path=":letter" element={<RandomWordCard />} />
          </Route>
          <Route path=":word" element={<WordCard />}>
            <Route path=":pos" element={<WordCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
