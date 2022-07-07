import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DriverForm from "./../components/forms/DriverForm";

import { DriversContext } from "./../contexts/driver.context.jsx";

function UpdateDriver() {
  const { drivers, updateDriver } = useContext(DriversContext);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(":rocket: ~ file: UpdateCar.jsx ~ line 9 ~ UpdateCar ~ id", id)

  const driver = drivers.find(({ _id }) => _id === id);
  // console.log(":rocket: ~ file: UpdateCar.jsx ~ line 16 ~ UpdateCar ~ car", car)

  const handler = (id, data) => {
    updateDriver(id, data);
    navigate("/");
  };

  return (
    <>
      <h1>Update Driver</h1>
      <DriverForm submitHandler={handler} driver={driver} />
    </>
  );
}

export default UpdateDriver;
