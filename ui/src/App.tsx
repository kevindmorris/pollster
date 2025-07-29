import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router";
import { router } from "./router";

export default function App() {
  return (
    <ThemeProvider
      theme={createTheme({
        typography: { h1: { fontSize: "2.5rem", fontWeight: 500 } },
      })}
    >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
