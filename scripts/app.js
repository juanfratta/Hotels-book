import hotelsData from "./scripts/data.js";

//COMPONENTE PRECIOS

const GetPrices = (props) =>
  Array.from(new Array(4), (n, index) =>
    index < props.prices ? (
      <i className="fas fa-dollar-sign price" key={index}></i>
    ) : (
      <i className="fas fa-dollar-sign price-disabled" key={index}></i>
    )
  );

//COMPONENTE CARD

function Card(props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={props.photo}></img>
      </div>
      <div className="card-title"> {props.name}</div>

      <div className="card-text">{props.description}</div>

      <div className="icons-container">
        <div className="icon-text">
          <i className="fas fa-map-marker icons"></i>
          <span> {props.country}</span>
        </div>

        <div className="icons-bottom">
          <div className="icon-text">
            <i className="fas fa-bed icons"></i>
            <span> {props.rooms} habitaciones</span>
          </div>

          <div className="icons-price">
            <div>
              {<GetPrices key={`prices-${uuidv4()}`} prices={props.price} />}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="button-reserve">
        <a
          href=""
          onClick={() =>
            alert("Esta funcionalidad no es parte del ejercicio :(")
          }
        >
          Reservar
        </a>
      </div>
    </div>
  );
}

//ERROR COMPONENT

function ErrorMessage(props) {
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
        Disculpe, pero salvo que que pueda viajar hacia atrás en el tiempo, es
        imposible que pueda hacer salir de un hotel antes de haber ingresado.
        Aunque si tiene uns máquina del tiempo, por favor no deje de contactarse
        con la administración. Gracias.{" "}
      </div>
    );
  } else if (dateError.length == "") {
    error = (
      <div className="main-error-message">No Hay hoteles para esa fecha</div>
    );
  } else if (countryError.length == "") {
    errof = (
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
        No hay hoteles disponibles con el tamaño seleccionado.{" "}
      </div>
    );
  }
  return <div>{error}</div>;
}
//MAIN COMPONENT

const Main = (props) => {
  const { pais, precio, tamaño, desde, hasta } = props.filters;

  let dateInverse = false;
  desde > hasta && hasta != "" ? (dateInverse = true) : (dateInverse = false);

  const filterByCheckIn = desde
    ? hotelsData.filter((hotel) => hotel.availabilityFrom >= Date.parse(desde))
    : hotelsData;

  const filterByCheckOut = hasta
    ? filterByCheckIn.filter(
        (hotel) => hotel.availabilityTo <= Date.parse(hasta)
      )
    : filterByCheckIn;

  const filterByCountry = pais
    ? filterByCheckOut.filter((hotel) => hotel.country === pais)
    : filterByCheckOut;

  const filterByPrice = precio
    ? filterByCountry.filter((hotel) => {
        if (precio === "$") return hotel.price === 1;
        if (precio === "$$") return hotel.price === 2;
        if (precio === "$$$") return hotel.price === 3;
        if (precio === "$$$$") return hotel.price === 4;
      })
    : filterByCountry;

  const filterByRooms = tamaño
    ? filterByPrice.filter((hotel) => {
        if (tamaño === "hotel pequeño") return hotel.rooms <= 10;
        if (tamaño === "hotel mediano")
          return hotel.rooms > 10 && hotel.rooms <= 20;
        if (tamaño === "hotel grande") return hotel.rooms > 20;
      })
    : filterByPrice;

  return (
    <div>
      {" "}
      <div>
        {" "}
        <ErrorMessage
          dateInverse={dateInverse}
          dateError={filterByCheckOut}
          countryError={filterByCountry}
          priceError={filterByPrice}
          roomsError={filterByRooms}
        />{" "}
      </div>
      <div className="main">
        {filterByRooms.map((hotel) => (
          <Card
            key={uuidv4()}
            name={hotel.name}
            photo={hotel.photo}
            description={hotel.description}
            country={hotel.country}
            rooms={hotel.rooms}
            price={hotel.price}
            desde={hotel.availabilityFrom}
            hasta={hotel.availabilityTo}
          />
        ))}
      </div>{" "}
    </div>
  );
};

//DATE COMPONENT

function DateSelect(props) {
  const inputLimit = new Date()
    .toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const date = new Date(props.valueDate)
    .toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");   

    /* const onDate = (e) => {
       const newDate = e.target.value
       return newDate
    } */

  return (
    <div className="icon-filter-container">
      <i className="far fa-calendar-times icon-filter" name="delete"></i>
      <input
        className="input-filter"
        type="date"
        name={props.name}
        onChange={props.date}
        min={inputLimit}
      /*   onChange={onDate}
 */
      ></input>
    </div>
  );
}

//SELECT COMPONENT

function OptionSelect(props) {
  const filterProp = [...new Set(Array.from(props.filter))];
  filterProp.sort();

  return (
    <div className="icon-filter-container">
      <i className={` ${props.icon} icon-filter`}></i>
      <select
        className="input-filter"
        onChange={props.select}
        name={props.name}
      >
        <option value="">{`Cualquier ${props.name}`}</option>
        {filterProp.map((valorAMostrar, index) => (
          <option value={valorAMostrar} key={index}>
            {valorAMostrar}
          </option>
        ))}
      </select>
    </div>
  );
}

// FILTERS COMPONENT

function FiltersContainer(props) {
  const { date, select } = props;

  const country = hotelsData.map((element) => element.country);
  const price = hotelsData.map((element) => {
    if (element.price === 1) return "$";
    if (element.price === 2) return "$$";
    if (element.price === 3) return "$$$";
    if (element.price === 4) return "$$$$";
  });

  const rooms = hotelsData.map((element) => {
    if (element.rooms <= 10) return "hotel pequeño";
    if (element.rooms > 10 && element.rooms <= 20) return "hotel mediano";
    if (element.rooms > 20) return "hotel grande";
  });

  return (
    <div className="filters-container">
      <DateSelect date={date} valueDate={props.filters.desde} name="desde" />
      <DateSelect date={date} valueDate={props.filters.hasta} name="hasta" />
      <OptionSelect
        select={select}
        filter={country}
        name="pais"
        icon="fas fa-globe"
      />
      <OptionSelect
        select={select}
        filter={price}
        name="precio"
        icon="fas fa-dollar-sign"
      />
      <OptionSelect
        select={select}
        filter={rooms}
        name="tamaño"
        icon="fas fa-bed"
      />
    </div>
  );
}

// HEADER COMPONENT

function Header(props) {
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
            El día de ingreso no puede ser igual o anterior al día de egreso.
            Por favor, seleccione un rango de fechas correcto.
          </p>
        )
      ) : (
        <p className="header-message">
          Por favor, seleccione las fechas en que desea reservar.
        </p>
      )}
    </div>
  );
}

//APP COMPONENT

export default class App extends React.Component {
  state = {
    desde: "",
    hasta: "",
    pais: undefined,
    tamaño: undefined,
    precio: undefined,
  };

  handlerDate = (e) => {
    this.setState({
      [e.target.name]: new Date(e.target.value.replace(/-/g, "/")),
    });
  };

  handlerSelect = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Header filters={this.state} />

        <FiltersContainer
          filters={this.state}
          date={this.handlerDate}
          select={this.handlerSelect}
        />

        <Main filters={this.state} />
      </div>
    );
  }
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
