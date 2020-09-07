import { Header } from "./components/header.js";
import { Main } from "./components/main.js";
import { FiltersContainer } from "./components/filtersContainer.js";

class App extends React.Component {
  state = {
    desde: "",
    hasta: "",
    pais: undefined,
    tamaño: undefined,
    precio: undefined,
  };

  handlerDate = (e) => {
    this.setState({
      [e.target.name]: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };

  deleteDate = (e) => {
    this.setState({ [e]: "" });
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
          deleteDate={this.deleteDate}
          select={this.handlerSelect}
        />

        <Main filters={this.state} />
      </div>
    );
  }
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
