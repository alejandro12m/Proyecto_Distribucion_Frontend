interface PropsIcon {
  onClick?: () => void;
}
export function PlusIcon(props: PropsIcon) {
  const { onClick } = props;

  return (
    <i
      className="bi bi-plus-circle text-success"
      role="button"
      onClick={onClick}
    ></i>
  );
}
