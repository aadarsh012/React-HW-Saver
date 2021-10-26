import classes from "./Sidedrawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

const Sidedrawer = (props) => {
  let classArray = [classes.Sidedrawer, classes.Close];

  if (props.open) {
    classArray = [classes.Sidedrawer, classes.Open];
  } else {
    classArray = [classes.Sidedrawer, classes.Close];
  }

  return (
    <>
      <Backdrop show={props.open} click={props.clicked} />
      <div className={classArray.join(" ")}>
        <NavigationItems link="/" classname="sidedrawerMenu">
          HOME
        </NavigationItems>
        <NavigationItems link="/all-products" classname="sidedrawerMenu">
          ALL PRODUCTS
        </NavigationItems>
        <NavigationItems link="/cart" classname="sidedrawerMenu">
          CART
        </NavigationItems>
        <NavigationItems link="/login" classname="sidedrawerMenu">
          LOGIN
        </NavigationItems>
      </div>
    </>
  );
};
export default Sidedrawer;
