import hotelsData from "./scripts/data.js";

//COMPONENTE PRECIOS
//Armo un array de cuatro posiciones, y según la prop que venga como price
//utilizo una clase enabled o disabled para mostrar los íconos

const GetPrices = (props) =>
  Array.from(new Array(4), (n, index) =>
    index < props.prices ? (
      <i className="fas fa-dollar-sign" key={index}></i>
    ) : (
      <i className="fas fa-dollar-sign disabled" key={index}></i>
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

      <div className="card-icons ">
        <div className="icon-text">
          <i className="fas fa-map-marker"></i>
          <span> {props.country}</span>
        </div>

        <div className="icons-bottom">
          <div className="icon-text">
            <i className="fas fa-bed"></i>
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

//MAIN COMPONENT

const Main = (props) => {
  const { pais, precio, tamaño } = props.filters;

  console.log(tamaño);

  const filterByCountry = pais
    ? hotelsData.filter((hotel) => hotel.country === pais)
    : hotelsData;

  const filterByPrice = precio
    ? filterByCountry.filter((hotel) => hotel.price == precio)
    : filterByCountry;

  const filterByRooms = tamaño
    ? filterByPrice.filter((hotel) => {
        if (tamaño === "hotel pequeño") return hotel.rooms <= 10;
        if (tamaño === "hotel mediano")
          return hotel.rooms > 10 && hotel.rooms <= 20;
        if (tamaño === "hotel grande") return hotel.rooms > 20;
      })
    : filterByPrice;

  return filterByRooms == "" ? (
    <div className="no-hotels">
      <span className="error">
        Lo sentimos, no hay hoteles que coincidan con su búsqueda : (
      </span>
    </div>
  ) : (
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
    </div>
  );
};

//DATE COMPONENT

function DateSelect(props) {
  {
    const inputLimit = new Date()
      .toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    return (
      <div>
        <input
          type="date"
          name={props.name}
          onChange={props.date}
          min={inputLimit}
        ></input>
      </div>
    );
  }
}

//SELECT COMPONENT

function OptionSelect(props) {
  //armo un array con la prop que deseo usar como filtro, lo ordeno y elimino los elementos repetidos.
  const filterProp = [...new Set(Array.from(props.filter))];
  filterProp.sort((a, b) => a - b);

  return (
    <select onChange={props.select} name={props.name}>
      <option value="">{`Cualquier ${props.name}`}</option>
      {filterProp.map((valorAMostrar, index) => (
        <option value={valorAMostrar} key={index}>
          {valorAMostrar}
        </option>
      ))}
    </select>
  );
}

// FILTERS COMPONENT

function FiltersContainer(props) {
  const { date, select } = props;

  const country = hotelsData.map((element) => element.country);
  const price = hotelsData.map((element) => element.price);

  //Reemplazo un string el el valor rooms

  const rooms = hotelsData.map((element) => {
    if (element.rooms <= 10) return "hotel pequeño";
    if (element.rooms > 10 && element.rooms <= 20) return "hotel mediano";
    if (element.rooms > 20) return "hotel grande";
  });

  return (
    <div className="filters-container">
      <DateSelect date={date} name="desde" />
      <DateSelect date={date} name="hasta" />
      <OptionSelect select={select} filter={country} name="pais" />
      <OptionSelect select={select} filter={price} name="precio" />
      <OptionSelect select={select} filter={rooms} name="tamaño" />
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
      <h1 className="title">Hoteles</h1>
      {desde && hasta ? (
        <p>
          Desde el
          <b> {desde.toLocaleString("es-AR", options)}</b>, hasta el
          <b> {hasta.toLocaleString("es-AR", optionsTwo)}</b>.
        </p>
      ) : (
        <p>Por favor, seleccione las fechas en que desea reservar.</p>
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
