export const Header = (props) => {
  const { desde, hasta } = props.filters;
  const options = { weekday: "long", month: "long", day: "numeric" };
  const optionsTwo = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="header">
      <h1 className="title">
        <a href="" className="title-page">
          Hoteles
        </a>
      </h1>
      {desde && hasta ? (
        desde < hasta ? (
          <p className="header-message">
            {" "}
            Desde el
            <b> {desde.toLocaleString("es-AR", options)}</b>, hasta el
            <b> {hasta.toLocaleString("es-AR", optionsTwo)}</b>.
          </p>
        ) : (
          <p className="header-message">
            El día de ingreso no puede ser igual o anterior al día de salida.
            Por favor, seleccione un rango de fechas correcto.
          </p>
        )
      ) : (
        <p className="header-message">
          Por favor seleccione las fechas en que desea reservar.
        </p>
      )}
    </div>
  );
};
