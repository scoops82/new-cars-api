import React, { useContext } from "react";
import CarForm from "../components/forms/CarForm";
import { CarsContext } from "../contexts/car.context";

function AddCar() {
  const { addCar } = useContext(CarsContext);
  return (
    <>
      <h1>Add Car</h1>
      <CarForm submitHandler={addCar} />
    </>
  );
}

export default AddCar;
