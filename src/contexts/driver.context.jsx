import React, { createContext, useState, useCallback } from "react";

export const DriversContext = createContext({
  fetchDrivers: () => [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
  driversLoaded: false,
  driversLoading: false,
  driversError: null,
  drivers: [],
});

export const DriversProvider = (props) => {
  const [drivers, setDrivers] = useState(() => {
    return JSON.parse(localStorage.getItem("drivers")) || [];
  });
  const [driversLoading, setDriversLoading] = useState(false);
  const [driversLoaded, setDriversLoaded] = useState(false);
  const [driversError, setDriversError] = useState(null);

  const DRIVERS_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/drivers/";

  const fetchDrivers = useCallback(async () => {
    if (driversLoading || driversLoaded || driversError) {
      return;
    }
    setDriversLoading(true);
    try {
      const response = await fetch(DRIVERS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("drivers", JSON.stringify(data));
      setDrivers(data);
    } catch (err) {
      setDriversError(err.message || err.statusText);
    } finally {
      setDriversLoaded(true);
      setDriversLoading(false);
    }
  }, [driversError, driversLoaded, driversLoading]);

  const addDriver = useCallback(
    async (formData) => {
      console.log("about to add", formData);
      try {
        const response = await fetch(DRIVERS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedDriver = await response.json();
        console.log("got data", savedDriver);
        const newDrivers = [...drivers, savedDriver];
        localStorage.setItem("drivers", JSON.stringify(newDrivers));
        setDrivers(newDrivers);
        // addToast(`Saved ${savedCar.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "driversError",
        // });
      }
    },
    [drivers]
  );

  const updateDriver = useCallback(
    async (id, formData) => {
      console.log("updating", id, formData);
      let updatedDriver = null;
      // Get index
      const index = drivers.findIndex((driver) => driver._id === id);
      console.log(index);
      if (index === -1) throw new Error(`Driver with index ${id} not found`);
      // Get actual driver
      const oldDriver = drivers[index];
      console.log("oldDriver", oldDriver);

      // Send the differences, not the whole update
      const updates = {};

      for (const key of Object.keys(oldDriver)) {
        if (key === "_id") continue;
        if (oldDriver[key] !== formData[key]) {
          updates[key] = formData[key];
        }
      }

      try {
        const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });

        if (response.status !== 200) {
          throw response;
        }

        // Merge with formData
        updatedDriver = {
          ...oldDriver,
          ...formData, // order here is important for the override!!
        };
        console.log("updatedDriver", updatedDriver);
        // recreate the cars array
        const updatedDrivers = [
          ...drivers.slice(0, index),
          updatedDriver,
          ...drivers.slice(index + 1),
        ];
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers));
        // addToast(`Updated ${updatedCar.name}`, {
        //   appearance: "success",
        // });
        setDrivers(updatedDrivers);
      } catch (err) {
        console.log(err);
      }
    },
    [drivers]
  );

  const deleteDriver = useCallback(
    async (id) => {
      let deletedDriver = null;
      try {
        const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = drivers.findIndex((driver) => driver._id === id);
        deletedDriver = drivers[index];
        // recreate the cars array without that car
        const updatedDrivers = [
          ...drivers.slice(0, index),
          ...drivers.slice(index + 1),
        ];
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers));
        setDrivers(updatedDrivers);
        console.log(
          `Deleted ${deletedDriver.firstname} ${deletedDriver.lastname}`
        );
      } catch (err) {
        console.log(err);
      }
    },
    [drivers]
  );

  return (
    <DriversContext.Provider
      value={{
        drivers,
        driversLoading,
        driversError,
        fetchDrivers,
        addDriver,
        updateDriver,
        deleteDriver,
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};
