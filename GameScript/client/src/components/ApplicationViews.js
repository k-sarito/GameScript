import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { RawgList } from "./rawg/RawgList";
import { GameList } from "./games/GameList";
import { EditProgress } from "./games/EditProgress";
import { ReviewForm } from "./reviews/ReviewForm";
import { ReviewDetials } from "./reviews/ViewReview";
import { GroupList } from "./groups/GroupList";



export default function ApplicationViews({ isLoggedIn, getLoggedInUser }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
              index
              element={isLoggedIn ? <RawgList getLoggedInUser={getLoggedInUser} /> : <Navigate to="/login" />}
            />
          <Route path="games/details/:gameId" element={<EditProgress/>}/>
          <Route path="games" element={<GameList getLoggedInUser={getLoggedInUser}/>}/>
          <Route path="review/create/:gameId" element={<ReviewForm/>}/>
          <Route path="review/details/:gameId" element={<ReviewDetials/>}/>
          <Route path="groups" element={<GroupList/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
      </Routes>
    </main>
  );
}