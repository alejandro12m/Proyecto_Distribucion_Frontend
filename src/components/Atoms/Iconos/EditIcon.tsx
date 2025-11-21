interface PropsIcon {
  onClick?: () => void;
}

export function EditIcon(props: PropsIcon) {
  const { onClick } = props;

  return (
    <i
      className="bi bi-pencil-square text-primary"
      role="button"
      onClick={onClick}
    ></i>
  );
}