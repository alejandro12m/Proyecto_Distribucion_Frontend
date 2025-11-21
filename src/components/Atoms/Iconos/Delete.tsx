interface PropsIcon {
  onClick?: () => void;
}
export function DeleteIcon(props: PropsIcon) {
  const { onClick } = props;

  return (
    <i
      className="bi bi-trash text-danger"
      role="button"
      style={{ color: "black", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.color = 'red')}
        onMouseLeave={e => (e.currentTarget.style.color = 'black')}
      onClick={onClick}
    ></i>
  );
}
