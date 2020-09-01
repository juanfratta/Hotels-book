import { GetPrices } from "./getPrices.js";

export const Card = (props) => {
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
};
