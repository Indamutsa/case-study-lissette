// import { useEffect } from "react";
import "../styles/finish.css";

function Finish() {
//   const history = useHistory()

//   useEffect(() => {
//     return () => {
//         if (history.action === 'POP') {
//             history.go(1);
//         }
//     };
// }, [history]);

  return (
    <div className="finish">
      <h1>Thank you!</h1>
      <p>
      Your response has been recorded.
      </p>
    </div>
  );
}

export default Finish;
