import React from "react";

const RestroomList = ({ restrooms = [] }) => {
  if (!restrooms.length) {
    return <h3>No Restroom Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Restrooms
      </h3>
      <div className="flex-row my-4">
        {restrooms &&
          restrooms.map((restroom) => (
            <div key={restroom._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <p className="card-body">{restroom.areaDescription}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RestroomList;
