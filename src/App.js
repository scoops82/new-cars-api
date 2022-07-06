import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";

import theme from "./theme";

import PageLayout from "./components/PageLayout.jsx";

import Home from "./pages/Home.jsx";
import AddCar from "./pages/AddCar.jsx";
import UpdateCar from "./pages/UpdateCar.jsx";
import NotFound from "./pages/NotFound.jsx";

import { CarsProvider } from "./contexts/car.context";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <CarsProvider>
            <Routes>
              <Route path="/" element={<PageLayout />}>
                <Route index element={<Home />} />
                <Route path="add" element={<AddCar />} />
                <Route path="update/:id" element={<UpdateCar />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CarsProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
