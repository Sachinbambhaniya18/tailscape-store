export function Button(props) {
  return (
    <button
      className={props.classes}
      variant={props.variantType}
      onClick={props.clickEvent}
      size={props.buttonSize}
      type={props.buttonType}
      key={props.buttonKey}
    >
      {props.children}
    </button>
  );
}
