import Navbar from '@/components/navbar/Navbar';
import Home from '@/pages/Home';
import React from 'react'

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <div className="w-[80%] mx-[10%] min-h-[calc(100vh-64px)] flex justify-center p-4">
                <Outlet />
              </div>
            </>
          }
        >
          <Route path="/" element={<Home />} />
          {/*<Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes