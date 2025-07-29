import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Nav from "./nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
