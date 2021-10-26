import "./NavigationItems.css";
import { NavLink } from "react-router-dom";

const NavigationItems = (props) => {
  return (
    <div className={props.classname}>
      <NavLink to={props.link} exact activeClassName="active">
        {props.children}
      </NavLink>
    </div>
  );
};
export default NavigationItems;
