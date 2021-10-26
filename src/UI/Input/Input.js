import "./Input.css";
const Input = (props) => {
  return (
    <div className="Input">
      <input
        type={props.type}
        onChange={props.changed}
        value={props.value}
        id={props.id}
        autoComplete="off"
        className={props.value ? "focused" : null}
      />
      <div></div>
      <span>{props.label}*</span>
      <p>{props.error}</p>
    </div>
  );
};
export default Input;
