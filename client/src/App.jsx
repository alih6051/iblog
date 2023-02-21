import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
