import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ShowReport from "../ShowReport/ShowReport";
import UpdateReport from "../UpdateReport/UpdateReport";
import "./App.css";

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({type: 'FETCH_REPORT'})
}, [])

  return (
    <>
      <Router>
        <Route exact path="/">
          <ShowReport />
        </Route>
        <Route path="/update/:id">
          <UpdateReport />
        </Route>
      </Router>
    </>
  );
}

export default App;
