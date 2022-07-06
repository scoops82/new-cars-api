import React from "react";
import Container from "@mui/material/Container";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default PageLayout;
