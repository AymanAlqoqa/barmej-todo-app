import React from "react";

export default ({ title, description, deleteCard, id }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-delete" onClick={deleteCard.bind(this, id)}>
        <i className="material-icons">delete</i>
      </span>
    </div>
  );
};
