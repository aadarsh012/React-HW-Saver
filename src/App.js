import "./App.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Containers/WelcomePage/Register/Register";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Register} />
    </div>
  );
}

export default App;
