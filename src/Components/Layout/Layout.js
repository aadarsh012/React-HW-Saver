import classes from "./Layout.module.css";
import { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import Footer from "../Navigation/Footer/Footer";
import ToggleButton from "../ToggleButton/ToggleButton";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const Layout = (props) => {
  const [scroll, setScroll] = useState(false);
  const [sideDrawer, setSideDrawer] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, [scroll]);

  const sideDrawerOpenHandler = () => {
    setSideDrawer(true);
  };

  const sideDrawerCloseHandler = () => {
    setSideDrawer(false);
  };

  return (
    <div className={classes.Layout}>
      {/* Navigation */}
      <NavBar show={!scroll} clicked={sideDrawerOpenHandler} />

      {/* Sidedrawer */}
      <Sidedrawer open={sideDrawer} clicked={sideDrawerCloseHandler} />

      {/* Toggle Navigation items button */}
      <ToggleButton show={scroll} />

      {/* main Page Content */}
      <main className={classes.Main}>{props.children}</main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
