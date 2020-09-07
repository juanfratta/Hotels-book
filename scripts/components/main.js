import { Card } from "./card.js";
import { ErrorMessage } from "./errorMessage.js";
import { hotelsData } from "data.js";

export const Main = (props) => {
  const { pais, precio, tamaño, desde, hasta } = props.filters;

  let dateInverse = false;

  desde > hasta && hasta != "" ? (dateInverse = true) : (dateInverse = false);

  const checkIn = moment(desde).format("YYYY-MM-DD");

  const checkOut = moment(hasta).format("YYYY-MM-DD");

  const filterByCheckIn = desde
    ? hotelsData.filter(
        (hotel) =>
          moment(hotel.availabilityFrom).format("YYYY-MM-DD") <= checkIn &&
          moment(hotel.availabilityTo).format("YYYY-MM-DD") >= checkIn
      )
    : hotelsData;

  const filterByCheckOut = hasta
    ? filterByCheckIn.filter(
        (hotel) =>
          moment(hotel.availabilityFrom).format("YYYY-MM-DD") <= checkOut &&
          moment(hotel.availabilityTo).format("YYYY-MM-DD") >= checkOut
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
