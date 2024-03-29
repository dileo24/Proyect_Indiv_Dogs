import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import DogCreate from "./components/DogCreate/DogCreate";
import Detail from "./components/Detail/Detail";

import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001"; //servidor local
axios.defaults.baseURL = "https://proyectindivdogs-production.up.railway.app"; //servidor deployado
//axios.defaults.baseURL = "https://pi-backend-t1n0.onrender.com"; //servidor deployado render

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={Detail} />
      <Route path="/dog" component={DogCreate} />
    </div>
  );
}

export default App;
