import classes from "./ToggleButton.module.css";
import { useEffect, useState } from "react";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
const ToggleButton = (props) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!props.show) {
      setToggle(false);
    }
  }, [props.show]);

  const openToggle = (
    <div className={classes.Open}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  const closeToggle = (
    <div className={classes.Close}>
      <div></div>
      <div></div>
    </div>
  );

  let classArray = [classes.Hidden];
  if (props.show) {
    classArray = [classes.ToggleButton];
  }

  return (
    <>
      <div className={classArray} onClick={() => setToggle(!toggle)}>
        {toggle ? closeToggle : openToggle}
      </div>
      <ToggleMenu show={toggle} hide={!props.show} />
    </>
  );
};
export default ToggleButton;
