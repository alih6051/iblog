import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountPage from "../pages/AccountPage";
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import PostPage from "../pages/PostPage";

import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};
export default AppRoutes;
