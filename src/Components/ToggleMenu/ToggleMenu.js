import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import classes from "./ToggleMenu.module.css";

const ToggleMenu = (props) => {
  let menu = null;
  if (props.show && !props.hide) {
    menu = (
      <div className={classes.ToggleMenu}>
        <NavigationItems link="/home" classname="toggleMenuItems">
          HOME
        </NavigationItems>
        <NavigationItems link="/images" classname="toggleMenuItems">
          IMAGES
        </NavigationItems>
        <NavigationItems link="/posts" classname="toggleMenuItems">
          POSTS
        </NavigationItems>
        <NavigationItems link="/albums" classname="toggleMenuItems">
          ALBUMS
        </NavigationItems>
      </div>
    );
  }
  return menu;
};
export default ToggleMenu;
