import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarForm from "./../components/forms/CarForm";

import { CarsContext } from "./../contexts/car.context";

function UpdateCar() {
  const { cars, updateCar } = useContext(CarsContext);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(":rocket: ~ file: UpdateCar.jsx ~ line 9 ~ UpdateCar ~ id", id)

  const car = cars.find(({ _id }) => _id === id);
  // console.log(":rocket: ~ file: UpdateCar.jsx ~ line 16 ~ UpdateCar ~ car", car)

  const handler = (id, data) => {
    updateCar(id, data);
    navigate("/");
  };

  return (
    <>
      <h1>UpdateCar</h1>
      <CarForm submitHandler={handler} car={car} />
    </>
  );
}

export default UpdateCar;
