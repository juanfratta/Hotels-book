export const DateSelect = (props) => {
  const inputLimit = new Date()
    .toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  let date = "";

  if (props.valueDate) {
    date = moment(props.valueDate).format("YYYY-MM-DD");
  }

  return (
    <div className="icon-filter-container">
      <i
        className="fas fa-sync-alt icon-filter"
        onClick={() => props.deleteDate(props.name)}
        name={props.name}
      ></i>
      <input
        className="input-filter"
        type="date"
        name={props.name}
        onChange={props.date}
        min={inputLimit}
        value={date}
      ></input>
    </div>
  );
};
