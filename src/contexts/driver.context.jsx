import React, { createContext, useState, useCallback } from "react";

export const DriversContext = createContext({
  fetchDrivers: () => [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
  loaded: false,
  loading: false,
  error: null,
  drivers: [],
});

export const DriversProvider = (props) => {
  const [drivers, setDrivers] = useState(() => {
    return JSON.parse(localStorage.getItem("drivers")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const DRIVERS_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/drivers/";

  const fetchDrivers = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(DRIVERS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("drivers", JSON.stringify(data));
      setDrivers(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  return (
    <DriversContext.Provider
      value={{
        drivers,
        fetchDrivers,
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};
