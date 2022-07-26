import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { RawgList } from "./rawg/RawgList";
import { GameList } from "./games/GameList";



export default function ApplicationViews({ isLoggedIn, getLoggedInUser }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
              index
              element={isLoggedIn ? <RawgList /> : <Navigate to="/login" />}
            />
          <Route path="games" element={<GameList getLoggedInUser={getLoggedInUser}/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
      </Routes>
    </main>
  );
}