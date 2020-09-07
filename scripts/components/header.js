export const Header = (props) => {
  const { desde, hasta } = props.filters;

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
            <b> {moment(desde).locale("es").format("DD [de] MMMM")}</b>, hasta
            el
            <b>
              {" "}
              {moment(hasta).locale("es").format("DD [de] MMMM [de] YYYY")}
            </b>
            .
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
