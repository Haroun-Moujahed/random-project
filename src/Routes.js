import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthProvider from "./Components/Authentication/AuthProvider";
import AppContent from "./Components/AppContent/AppContent";
import LoginPage from "./Components/LoginPage/LoginPage";
import AppMain from "./Components/AppContent/AppMain/AppMain";
import MailsList from "./Components/AppContent/AppMain/MailsList/MailsList";
import MailSend from "./Components/AppContent/AppMain/MailSend/MailSend";

import PrivateRoute from "./Utils/PrivateRoute";
import PageNotFound from "./Components/AppContent/AppMain/PageNotFound/PageNotFound";

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppContent />}>
          <Route element={<AppMain />}>
            <Route
              path="/"
              element={<PrivateRoute component={<MailsList />} />}
            />
            <Route
              path="/mail"
              element={<PrivateRoute component={<MailSend />} />}
            />
            <Route
              path="*"
              element={<PrivateRoute component={<PageNotFound />} />}
            />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
