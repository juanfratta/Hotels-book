import hotelsData from "./scripts/data.js";
const today = new Date();

function Card(props) {
  const prices = Array.from(new Array(props.price));
  return (
    <div className="card">
      <div className="card-image">
        {" "}
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
            <span> {props.rooms}</span>
          </div>

          <div className="icons-price">
            <span>{prices.map((price) => " $ ")}</span>
          </div>
        </div>
      </div>
      <div className="button-reserve">
        <a href=""> Reservar </a>
      </div>
    </div>
  );
}

//MAIN COMPONENT

const Main = (props) => (
  <div className="main">
    {hotelsData.map((hotel) => (
      <Card
        key={hotel.slug}
        name={hotel.name}
        photo={hotel.photo}
        description={hotel.description}
        country={hotel.country}
        rooms={hotel.rooms}
        price={hotel.price}
      />
    ))}
    ,
  </div>
);
//DATE COMPONENT

function DateSelect(props) {
  {
    return (
      <div>
        <input type="date" name={props.name} onChange={props.date}></input>
      </div>
    );
  }
}

//SELECT COMPONENT

class OptionSelect extends React.Component {
  render() {
    return (
      <select>
        <option value="0">Todos los paises</option>
        <option value="1"> pais 1</option>
        <option value="2"> pais 2</option>
        <option value="3"> pais 3</option>
        <option value="4"> pais 4</option>
      </select>
    );
  }
}
// FILTERS COMPONENT

function FiltersContainer(props) {
  return (
    <div className="filters-container">
      <DateSelect date={props.date} name="desde" />
      <DateSelect date={props.date} name="hasta" />

      <OptionSelect />
      <OptionSelect />
      <OptionSelect />
    </div>
  );
}

// HEADER COMPONENT

function Header(props) {
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
      <p>
        Desde el
        <b> {props.filters.desde.toLocaleString("es-AR", options)}</b>, hasta el
        <b> {props.filters.hasta.toLocaleString("es-AR", optionsTwo)}</b>.
      </p>
    </div>
  );
}

//APP COMPONENT

export default class App extends React.Component {
  state = {
    desde: today,
    hasta: "",
    pais: undefined,
    ubicacion: undefined,
    habitaciones: undefined,
  };

  handlerDate = (e) => {
    this.setState({
      [e.target.name]: new Date(e.target.value.replace(/-/g, "/")),
    });
  };

  render() {
    return (
      <div>
        <Header filters={this.state} />

        <FiltersContainer filters={this.state} date={this.handlerDate} />

        <Main filters={this.state} />
      </div>
    );
  }
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
