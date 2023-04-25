import React from "react";
const ListGroup = (props) => {
  const { items, textProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[textProperty]}
          className={
            selectedItem[textProperty] === item[textProperty]
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
