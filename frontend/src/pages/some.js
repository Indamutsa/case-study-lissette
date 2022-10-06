import { useState } from "react";
import "../styles/survey.css";
// import TableRow from "../components/TableRow";
// import TableTitle from "../components/TableTitle";
import participants from "../data/ParticipantsWithCaseIDs.json";
import data from "../data/JSSUserStudyCases_311Education.json";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";

//Get the cases assigned to the participant 
function getPageData(participant_id) {
  //Get the id cases for the participant
  const caseIds = participants[participant_id ? participant_id : 0]["caseID"];

  let caseIDdataArray = [];

  //Get the cases for the cases id collected
  for (const caseId of caseIds) {
    let extArr = data.filter((d) => d.caseID === caseId);
    caseIDdataArray.push(extArr);
  }

  return caseIDdataArray;
}


function Survey1() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [page, setPage] = useState(1);
  // let imgs = [74, 266, 476];
  // console.log("****************", page);

  /* Function definition */
  const nextPage = (e) => {
    e.preventDefault();

    if (page === 3) setPage(0);
    else setPage(page + 1);
  };

  const prevPage = (e) => {
    e.preventDefault();

    if (page === 0) setPage(3);
    else setPage(page - 1);
  };

  const reset = (e) => {
    navigate("/Finish")
  };

  /* Function calls */
  let data = getPageData(state.id);
  // console.log(state);

  let currentData = data[page - 1 < 0 ? setPage(3) : page - 1];
  // console.log(currentData);
  let imageId = currentData[1].targetID;
  let methods = currentData.filter((curr) => curr.type === "Operation");
  let attributes = currentData.filter((curr) => curr.type === "Property");
  let attrs = {
    data: attributes,
    title: "Attributes"
  }

  let meths = {
    data: methods,
    title: "Methods"
  }
  // src={`/img/${imgs[page - 1 < 0 ? setPage(1) : page - 1]}.png`}
  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Case {page}</h1>
        <div className="mini-header">
          <h3>Page {page} of 3</h3>
          {/* <div className="radios">
            <input type="radio" />
            <input type="radio" />
            <input type="radio" />
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="leftBlock">
          <div className="image">
            <img
              src={`/img/${imageId}.png`}
              alt="first"
            />
          </div>
          <div className="description">
            <h3>Information</h3>
            <br />
            <p>
              The figure shows a class diagram with a class in blue. This class
              is the target class subject to the recommendations. The target
              class is the class subject to the recommendations. The other
              classes of the class diagram, shown in grey, are the context
              information of the target class.
            </p>
            <br />
            <p>
              Evaluate the recommended items presented in the list to the right
              using the following criteria:
            </p>
            <ul>
              <li>
                <b>Correct:</b> The recommended item is correct for the target
                class
              </li>
              <li>
                <b>Obvious:</b> The recommended item is an item you could have
                easily come up with yourself
              </li>
              <li>
                <b>Redundant:</b> The recommended item exists or is similar to
                an existing one
              </li>
              <li>
                <b>Contextualized:</b> The recommended item belongs to the
                diagram domain
              </li>
              <li>
                <b>Generalizable:</b> The recommended item is also applicable to
                other classes of the diagram
              </li>
            </ul>
          </div>
        </div>
        <div className="rightBlock">
          <div>
            <h3>Recommended items</h3>
            <Table item={attrs} />
            <br />
            <Table item={meths} />
            <br />
          </div>
          <div className="submi">
            <h4> Provide here your recommendation</h4>
            <input
              type="text"
              name=""
              id=""
              placeholder="Your recommendation"
            />
            {page !== 1 && <button onClick={prevPage}>Previous</button>}
            {page !== 3 && <button onClick={nextPage}>Next</button>}
            {page === 3 && <button onClick={reset}>Submit</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey1;

{/* <br />
            <TableTitle title="Attributes" />
            <div className="tableRow">
              {attributes.map((attribute, i) => (
                <TableRow item={attribute} key={i} />
              ))}
            </div>

            <br />
            <TableTitle title="Methods" />
            <div className="tableRow">
              {methods.map((attribute, i) => (
                <TableRow item={attribute} key={i} />
              ))}

            </div>
            <div className="submi">
              <h4> Provide here your recommendation</h4>
              <input
                type="text"
                name=""
                id=""
                placeholder="Your recommendation"
              />
              {page !== 1 && <button onClick={prevPage}>Previous</button>}
              {page !== 3 && <button onClick={nextPage}>Next</button>}
              {page === 3 && <button onClick={reset}>Submit</button>}
            </div> */}