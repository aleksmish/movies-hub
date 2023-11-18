import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

export default RedirectToLandingPage;
