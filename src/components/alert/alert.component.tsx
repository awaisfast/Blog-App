import React, { useState } from "react";
interface AlertProps {
  props: string;
}
const Alert = ({ props }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className={"text-white px-6 py-2 border-0 rounded bg-red-400 fixed"}
        >
          <p className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </p>
          <p className="inline-block align-middle mr-8">{props}</p>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <p>×</p>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
