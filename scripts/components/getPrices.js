export const GetPrices = (props) =>
  Array.from(new Array(4), (n, index) =>
    index < props.prices ? (
      <i className="fas fa-dollar-sign price" key={index}></i>
    ) : (
      <i className="fas fa-dollar-sign price-disabled" key={index}></i>
    )
  );
