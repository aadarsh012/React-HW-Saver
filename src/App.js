import "./App.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Containers/WelcomePage/Register/Register";
import Home from "./Containers/HomePage/Home";
import Images from "./Containers/ImagesPage/Images";
import Posts from "./Containers/Posts/Posts";
import Post from "./Containers/Posts/SinglePost/Post";
function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Register} />
      <Layout>
        <Route path="/home" exact component={Home} />
        <Route path="/images" exact component={Images} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" exact component={Post} />
      </Layout>
    </div>
  );
}

export default App;
