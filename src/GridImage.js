import React from "react";

function GridImage({ data }) {
  return (
    <>
      <div className="gridImg">
        <img src={data?.images?.original?.url} />
      </div>
    </>
  );
}

export default GridImage;
