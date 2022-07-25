import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { RawgList } from "./rawg/RawgList";



export default function ApplicationViews({ isLoggedIn, getLoggedInUser }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
              index
              element={isLoggedIn ? <RawgList /> : <Navigate to="/login" />}
            />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
      </Routes>
    </main>
  );
}