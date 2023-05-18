import React, { useContext, useState } from "react";
import "../style/Home.css";
import { Context } from "../index";

const Home = () => {
  const [data, setData] = useState({});
  const { isAuthenticated } = useContext(Context);

  const getRandomQuote = async () => {
    try {
      const data = await fetch("https://api.quotable.io/random");
      const json = await data.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container" id="home">
      <div className="wrapper">
        <h1>Get Random Quote</h1>
        <div className="randomQuote">
          <h2>{data.author}</h2>
          <p>{data.content}</p>
        </div>
        {isAuthenticated ? (
          <button className="btn" onClick={() => getRandomQuote()}>
            Generate Quote
          </button>
        ) : (
          <h1>Login First</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
