import React from "react";

const ShowItemDetails = (props) => {
  return (
    <div className="comps-btw-lists">
      <div className="student-page">
        <p>
          <b>Gender:</b> {props.gender === "M" ? "Masculino" : "Femenino"}
        </p>
        <p>
          <b>Email: </b>
          {props.email || "No registrado"}
        </p>
        <p>
          <b>Location: </b>
          {props.location || "No registrado"}
        </p>
        <p>
          <b>Document: </b>
          {props.documentNo || "No registrado"}
        </p>
      </div>
    </div>
  );
};

export default ShowItemDetails;
