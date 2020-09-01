export const OptionSelect = (props) => {
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
};
