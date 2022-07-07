import React, { useContext } from "react";
import DriverForm from "../components/forms/DriverForm.jsx";
import { DriversContext } from "../contexts/driver.context";

function AddDriver() {
  const { addDriver } = useContext(DriversContext);
  return (
    <>
      <h1>Add Driver</h1>
      <DriverForm submitHandler={addDriver} />
    </>
  );
}

export default AddDriver;
