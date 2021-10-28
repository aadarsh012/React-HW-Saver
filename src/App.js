import "./App.css";
import { Route, Switch } from "react-router-dom";

import Register from "./Containers/WelcomePage/Register/Register";
import Home from "./Containers/HomePage/Home";
import Images from "./Containers/ImagesPage/Images";
import Posts from "./Containers/Posts/Posts";
import Post from "./Containers/Posts/SinglePost/Post";
import Albums from "./Containers/Albums/Albums";
import Album from "./Containers/Albums/SingleAlbum/Album";
import { useEffect } from "react";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/home" exact component={Home} />
        <Route path="/images" exact component={Images} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" exact component={Post} />
        <Route path="/albums" exact component={Albums} />
        <Route path="/albums/photos/:albumId" exact component={Album} />
      </Switch>
    </div>
  );
}

export default App;
