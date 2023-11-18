import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "../store/AuthContext";

type AuthProps = {
  authorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
};

const Authorized = (props: AuthProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { claims } = useContext(AuthenticationContext);

  useEffect(() => {
    if (props.role) {
      const index = claims.findIndex(
        (claim) => claim.name === "role" && claim.value === props.role
      );
      setIsAuthorized(index > -1);
    } else {
      setIsAuthorized(claims.length > 0);
    }
  }, [claims, props.role]);

  return <>{isAuthorized ? props.authorized : props.notAuthorized}</>;
};

export default Authorized;
