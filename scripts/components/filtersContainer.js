import { DateSelect } from "./dateSelect.js";
import { OptionSelect } from "./optionSelect.js";
import { hotelsData } from "../data.js";

export const FiltersContainer = (props) => {
  const { date, select, deleteDate } = props;
  const { desde, hasta } = props.filters;

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
      <DateSelect
        date={date}
        deleteDate={deleteDate}
        valueDate={desde}
        name="desde"
      />

      <DateSelect
        date={date}
        deleteDate={deleteDate}
        valueDate={hasta}
        name="hasta"
      />

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
};
