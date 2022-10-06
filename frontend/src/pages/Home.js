import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/home.css";

import { useAppContext } from "../context/AppContext";
// import { Table } from "../components/Table";

function Home() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { userId } = useParams();


  const handleSubmit = (e) => {
    e.preventDefault();
    //For url parameter
    if (Number(userId)) {
      dispatch({ type: "navigate", value: userId });
      // console.log(state);
      navigate("/survey");
    } else {
      alert("Please enter the integer...")
    }



    // For input
    // let inputId = inputRef.current.value;

    // if (Number(inputId)) {
    //   dispatch({ type: "navigate", value: inputId });
    //   // console.log(state);
    //   navigate("/survey");
    // } else {
    //   alert("Please enter the integer...")
    // }

  };

  // UseContext when using useReducer
  // const { state, dispatch } = useAppContext();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let searchQuery = inputRef.current.value;

  //   dispatch({ type: "add_number", value: searchQuery });
  //   router.push(`/result`);
  // };

  return (
    <div className="home">
      <h1>User study</h1>
      <p>
        This study aims to evaluate recommendations for class diagrams.
        The recommendations are generated with Droid, a model-driven solution to automate the synthesis of recommender systems for modelling languages.
        Participation in this study is voluntary. During the study, the participants will have to evaluate several items that have been recommended for 3 different class diagrams,
        according to several quality criteria. This study is scientific and has no economic or commercial purposes.
      </p>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="peas">Enter your ID to proceed: </label>
        <br />
        <input className="inputId" type="text" ref={inputRef} />
        <br /> */}
        <button type="submit" className="buttonID">
          Next
        </button>
      </form>
      {/* <Table /> */}
    </div>
  );
}

export default Home;
