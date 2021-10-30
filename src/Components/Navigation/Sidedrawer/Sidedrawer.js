import classes from "./Sidedrawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/actionCreators";

const Sidedrawer = (props) => {
  let classArray = [classes.Sidedrawer, classes.Close];

  if (props.open) {
    classArray = [classes.Sidedrawer, classes.Open];
  } else {
    classArray = [classes.Sidedrawer, classes.Close];
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    props.onLogout();
  };
  return (
    <>
      <Backdrop show={props.open} click={props.clicked} />
      <div className={classArray.join(" ")}>
        <NavigationItems link="/home" classname="sidedrawerMenu">
          HOME
        </NavigationItems>
        <NavigationItems link="/images" classname="sidedrawerMenu">
          IMAGES
        </NavigationItems>
        <NavigationItems link="/posts" classname="sidedrawerMenu">
          POSTS
        </NavigationItems>
        <NavigationItems link="/albums" classname="sidedrawerMenu">
          ALBUMS
        </NavigationItems>
        <button className={classes.logout} onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Sidedrawer);
