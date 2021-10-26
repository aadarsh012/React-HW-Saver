import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const NavBar = (props) => {
  let classArray = [classes.NavBar];
  if (!props.show) {
    classArray = [classes.NavBar, classes.Disappear];
  }
  return (
    <nav className={classArray.join(" ")}>
      {/* logo */}
      <div className={classes.Logo}>
        <a href="/">
          M
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          RN-CART
        </a>
        <div className={classes.mobile_Logo}>
          M
          <div className={classes.ToggleSideDrawer} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          RN-CART
        </div>
      </div>

      {/* Navigation Items */}
      <div className={classes.NavigationItems}>
        <NavigationItems link="/" classname="navigationItem">
          HOME
        </NavigationItems>
        <NavigationItems link="/all-products" classname="navigationItem">
          ALL PRODUCTS
        </NavigationItems>
        <NavigationItems link="/cart" classname="navigationItem">
          CART
        </NavigationItems>
        <NavigationItems link="/login" classname="navigationItem">
          LOGIN
        </NavigationItems>
      </div>
    </nav>
  );
};
export default NavBar;
