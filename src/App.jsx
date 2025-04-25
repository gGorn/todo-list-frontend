import React from "react";
import AppRoutes from "./routes/Approutes";
import { Toaster } from "@/components/ui/toaster";
const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
