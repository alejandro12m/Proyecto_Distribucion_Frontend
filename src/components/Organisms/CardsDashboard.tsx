interface propCardsDashboard {
  Numeros: number[];
  Texts: string[];
}

export function CardsDashboard({ Numeros, Texts }: propCardsDashboard) {
  return (
    <div className="row g-3">
      {Numeros.map((num, index) => (
        <div
          key={index}
          className="col-12 col-md-6 d-flex justify-content-center"
        >
          <div
            className="card text-center border rounded p-3 d-flex flex-column align-items-center"
            style={{ width: "200px" }}
          >
            <div
              style={{ width: "100px", height: "100px" }}
              className="card text-center border border-dark rounded-circle d-flex flex-column justify-content-center align-items-center mb-2"
            >
              <h2 className="mb-0">{num}</h2>
            </div>
            <p className="mb-0">{Texts[index]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
