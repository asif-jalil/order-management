import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { DASHBOARD } from "../../constants/AppUrls";

const GuestPage = ({ children }) => {
  const location = useLocation();

  const isAuth = useSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to={location.state?.from || DASHBOARD} />;
  } else {
    return children;
  }
};

export default GuestPage;
