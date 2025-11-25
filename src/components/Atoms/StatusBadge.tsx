interface propsStatus{
    status:string;
}

export  function StatusBadge(props: propsStatus) {
    const {status} =props;
  const color =
    status === "en proceso" ? "warning" : status === "entregado" ? "success" : "danger";
  return <span className={`badge bg-${color}`}>{status}</span>;
}
