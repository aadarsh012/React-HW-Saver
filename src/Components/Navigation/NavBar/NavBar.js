import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import { withRouter } from "react-router-dom";

const NavBar = (props) => {
  let classArray = [classes.NavBar];
  if (!props.show) {
    classArray = [classes.NavBar, classes.Disappear];
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    props.history.replace("/");
  };
  return (
    <nav className={classArray.join(" ")}>
      {/* logo */}
      <div className={classes.Logo}>
        <a href="/">
          R
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          ACT-STARS
        </a>
        <div className={classes.mobile_Logo}>
          R
          <div className={classes.ToggleSideDrawer} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          ACT-STARS
        </div>
      </div>

      {/* Navigation Items */}
      <div className={classes.NavigationItems}>
        <NavigationItems link="/home" classname="navigationItem">
          HOME
        </NavigationItems>
        <NavigationItems link="/images" classname="navigationItem">
          IMAGES
        </NavigationItems>
        <NavigationItems link="/posts" classname="navigationItem">
          POSTS
        </NavigationItems>
        <NavigationItems link="/albums" classname="navigationItem">
          ALBUMS
        </NavigationItems>
        <button className={classes.logout} onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
};
export default withRouter(NavBar);
