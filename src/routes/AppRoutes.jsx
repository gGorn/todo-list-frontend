import Navbar from '@/components/navbar/Navbar';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import Cart from "@/pages/Cart";
import TodoList from '@/pages/TodoList';
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
          <Route path="/" element={<TodoList />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes