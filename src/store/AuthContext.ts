import { createContext } from "react";
import { Claim } from "../types/claim";

const AuthenticationContext = createContext<{claims: Claim[]; update: (claims: Claim[]) => void}>({claims: [], update: ([]) => null});

export default AuthenticationContext;