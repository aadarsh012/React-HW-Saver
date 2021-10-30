import "./App.css";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { checkAuthState } from "./store/actions/actionCreators";

import Register from "./Containers/WelcomePage/Register/Register";
import Home from "./Containers/HomePage/Home";
import Images from "./Containers/ImagesPage/Images";
import Posts from "./Containers/Posts/Posts";
import Post from "./Containers/Posts/SinglePost/Post";
import Albums from "./Containers/Albums/Albums";
import Album from "./Containers/Albums/SingleAlbum/Album";
// import Logout from "./Containers/WelcomePage/Logout/Logout";
import { connect } from "react-redux";
function App(props) {
  useEffect(() => {
    props.onAutoLogin();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Register} />
        {/* <Route path="/logout" exact component={Logout} /> */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(checkAuthState())
  };
};

export default connect(null, mapDispatchToProps)(App);
