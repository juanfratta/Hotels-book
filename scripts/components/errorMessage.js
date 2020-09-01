export const ErrorMessage = (props) => {
  const {
    dateError,
    countryError,
    priceError,
    roomsError,
    dateInverse,
  } = props;

  let error = "";

  if (dateInverse === true) {
    error = (
      <div className="main-error-message">
        Disculpe, pero es imposible que pueda salir de un hotel antes de haber
        ingresado. Por favor, seleccione un rango de fechas correcto. Gracias.
      </div>
    );
  } else if (dateError.length == "") {
    error = (
      <div className="main-error-message">No Hay hoteles para esa fecha</div>
    );
  } else if (countryError.length == "") {
    error = (
      <div className="main-error-message">
        No hay hoteles disponibles en el país seleccionado.
      </div>
    );
  } else if (priceError.length == "") {
    error = (
      <div className="main-error-message">
        No hay hoteles disponibles en el rango de precios seleccionado.
      </div>
    );
  } else if (roomsError.length == "") {
    error = (
      <div className="main-error-message">
        No hay hoteles disponibles con el tamaño seleccionado.
      </div>
    );
  }
  return <div>{error}</div>;
}
