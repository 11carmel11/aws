import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./components/Dictionary";
import WordCard from "./components/WordCard";
import RandomWordCard from "./components/RandomWordCard";
import { get } from "./config";

export default function App() {
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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dictionary dict={dict} />} />
          <Route path="pos/:pos" element={<RandomWordCard />}>
            <Route path=":letter" element={<RandomWordCard />} />
          </Route>
          {/* TD -> add option choosing letter query */}
          <Route path=":word" element={<WordCard />}>
            <Route path=":pos" element={<WordCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
