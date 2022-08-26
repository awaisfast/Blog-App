import React, { Fragment, useState } from "react";
interface Content {
  props: string;
  color: string;
}
const Alert = ({ props, color }: Content) => {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
      {showAlert ? (
        <>
          <div
            className={
              "text-white px-6 py-2 border-0 rounded relative mb-4 bg-red-400"
            }
          >
            <span className="text-xl inline-block mr-5 align-middle">
              <i className="fas fa-bell" />
            </span>
            <span className="inline-block align-middle mr-8">{props}</span>
            <button
              className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <span>×</span>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Alert;
