import React, { useState } from "react";
interface Content {
  props: string;
}
const Alert = ({ props }: Content) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <>
          <div
            className={"text-white px-6 py-2 border-0 rounded bg-red-400 fixed"}
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
