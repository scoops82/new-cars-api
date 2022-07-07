import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";

import theme from "./theme";

import PageLayout from "./components/PageLayout.jsx";

import Home from "./pages/Home.jsx";
import AddCar from "./pages/AddCar.jsx";
import UpdateCar from "./pages/UpdateCar.jsx";
import AddDriver from "./pages/AddDriver.jsx";
import UpdateDriver from "./pages/UpdateDriver.jsx";
import NotFound from "./pages/NotFound.jsx";

import { CarsProvider } from "./contexts/car.context";
import { DriversProvider } from "./contexts/driver.context";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <CarsProvider>
            <DriversProvider>
              <Routes>
                <Route path="/" element={<PageLayout />}>
                  <Route index element={<Home />} />
                  <Route path="add-car" element={<AddCar />} />
                  <Route path="update-car/:id" element={<UpdateCar />} />
                  <Route path="add-driver" element={<AddDriver />} />
                  <Route path="update-driver/:id" element={<UpdateDriver />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </DriversProvider>
          </CarsProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
