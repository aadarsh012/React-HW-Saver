import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import classes from "./ToggleMenu.module.css";

const ToggleMenu = (props) => {
  let menu = null;
  if (props.show && !props.hide) {
    menu = (
      <div className={classes.ToggleMenu}>
        <NavigationItems link="/" classname="toggleMenuItems">
          HOME
        </NavigationItems>
        <NavigationItems link="/all-products" classname="toggleMenuItems">
          ALL PRODUCTS
        </NavigationItems>
        <NavigationItems link="/cart" classname="toggleMenuItems">
          CART
        </NavigationItems>
        <NavigationItems link="/login" classname="toggleMenuItems">
          LOGIN
        </NavigationItems>
      </div>
    );
  }
  return menu;
};
export default ToggleMenu;
