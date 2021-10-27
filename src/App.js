import "./App.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Containers/WelcomePage/Register/Register";
import Home from "./Containers/HomePage/Home";
import Images from "./Containers/ImagesPage/Images";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Register} />
      <Layout>
        <Route path="/home" component={Home} />
        <Route path="/images" component={Images} />
      </Layout>
    </div>
  );
}

export default App;
