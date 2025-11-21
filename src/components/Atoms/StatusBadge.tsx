interface propsStatus{
    status:string;
}

export  function StatusBadge(props: propsStatus) {
    const {status} =props;
  const color =
    status === "Pendiente" ? "warning" : status === "Entregado" ? "success" : "danger";
  return <span className={`badge bg-${color}`}>{status}</span>;
}
