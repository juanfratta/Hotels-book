import hotelsData from "./scripts/data.js";

const Price = () => <i className="fas fa-dollar-sign"></i>;
const PriceTwo = () => <i className="fas fa-dollar-sign dollar-opaque"></i>;

const GetPrices = (props) =>
  Array.from(new Array(4), (n, index) =>
    //En realidad acá quise usar sólo el componente Price, y hacer algo así como:
    //<Price key={`price-${index}`} style={{ opacity: index < props.prices ? 1.0 : 0.2 }} />)
    //Si lo reviso con React Dev Tools me pasa bien la prop y no me da ningun error,
    //pero no me genera el inline style ni ningún cambio.
    //La solución medio pedorra que encontré es usar dos componentes :(
    index < props.prices ? (
      <Price key={`price-${index}`} />
    ) : (
      <PriceTwo key={`price-${index}`} />
    )
  );

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

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        {hotelsData.map((hotel) => (
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
  }
}

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

//Tengo un problema con la key del map en este componente. Intenté usar el uuid por cdn y me lo toma bien.
//Pero sintácticamente no sé cómo hacer para que funcione sin que me tire el warning.

function OptionSelect(props) {
  //armo un array con la prop que deseo usar como filtro, lo ordeno y elimino los elementos repetidos.
  const filterProp = [...new Set(Array.from(props.filter))];
  filterProp.sort((a, b) => a - b);

  return (
    <select onChange={props.select} name={props.name}>
      <option value="">{`Cualquier ${props.name}`}</option>
      {filterProp.map((valorAMostrar) => (
        <option key={uuidv4()}>{valorAMostrar}</option>
      ))}
    </select>
  );
}

// FILTERS COMPONENT

function FiltersContainer(props) {
  const { date, select } = props;
  const price = hotelsData.map((element) => element.price);
  const rooms = hotelsData.map((element) => element.rooms);
  const country = hotelsData.map((element) => element.country);

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
    habitaciones: undefined,
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
