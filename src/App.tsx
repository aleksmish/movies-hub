import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Navigation from "./components/shared/Navigation";
import "./input.css";
import routes from "./routes";
import AuthenticationContext from "./store/AuthContext";
import { Claim } from "./types/claim";
import configureValidations from "./validations";
import NotAllowed from "./components/shared/NotAllowed";
import { getClaims } from "./utils/handleJWT";
import configureInterceptor from "./httpInterceptors";

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<Claim[]>([]);

  const isAdmin = () => {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) >= 0
    );
  };

  useEffect(() => {
    setClaims(getClaims());
  }, [])

  return (
    <ConfigProvider>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Navigation />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.isAdmin && !isAdmin() ? (
                  <NotAllowed />
                ) : (
                  <route.component />
                )
              }
            />
          ))}
        </Routes>
        <Footer />
      </AuthenticationContext.Provider>
    </ConfigProvider>
  );
}

export default App;
