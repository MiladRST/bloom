import React from "react";

const Description = ({ name , shortDescription, longDescription }) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <h3>{name}</h3>
    
      <p>
        {shortDescription}
      </p>
      <p>
       {longDescription}
      </p>
    </div>
  );
};

export default Description;
