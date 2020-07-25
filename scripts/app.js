import hotelsData from "./scripts/data.js";
const today = new Date();

function GetPrices(props) {
  let icons = [];
  for (let i = 1; i <= 4; i++) {
    if(props.prices>= i){icons = icons +`$`}else{icons = icons + "-"};
  }
  return <span>{icons}</span>;
}

function Card(props) {
  const prices = Array.from(new Array(props.price));

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
            <span> {props.rooms}</span>
          </div>

          <div className="icons-price">
            <div>
              <GetPrices prices={props.price} />
            </div>
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

const Main = () => (
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
    <select onChange={props.select}>
      <option>{`Cualquier ${props.name}`}</option>
      {filterProp.map(
        (valorAMostrar) => <option>{valorAMostrar}</option>
      )}
    </select>
  );
}

// FILTERS COMPONENT

function FiltersContainer(props) {
  const { date, select } = props;
  const price = hotelsData.map((element, index) => element.price);
  const rooms = hotelsData.map((element, index) => element.rooms);
  const country = hotelsData.map((element, index) => element.country);

  return (
    <div className="filters-container">
      <DateSelect date={date} name="desde" />
      <DateSelect date={date} name="hasta" />
      <OptionSelect
        select={select}
        filter={country}
        name="pais"
        />
       
      <OptionSelect
        select={select}
        filter={price}
        name="precio"
        
      />
      <OptionSelect
        select={select}
        filter={rooms}
        name="tamaño"
       
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
    ubicacion: undefined,
    habitaciones: undefined,
  };

  handlerDate = (e) => {
    this.setState({
      [e.target.name]: new Date(e.target.value.replace(/-/g, "/")),
    });
  };

  handlerSelect = (e) => {
    console.log(e.target.value);
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
