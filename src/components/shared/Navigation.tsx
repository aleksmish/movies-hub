import { Link } from "react-router-dom";
import Authorized from "../../pages/Authorized";
import { Button } from "antd";
import { logout } from "../../utils/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "../../store/AuthContext";

const Navigation = () => {
  const {claims, update} = useContext(AuthenticationContext);

  const getUserEmail = () => {
    return claims.find(claim => claim.name === "email")?.value;
  }

  return (
    <header className="h-[70px] flex flex-row justify-center content-center w-full m-auto border-b-[solid #e9f4f7] border-b-[1px]">
      <div className="flex flex-row justify-between align-middle content-center w-full p-5 max-w-[1200px]">
        <div className="flex flex-row self-center justify-center content-center">
          <h1>
            <Link to="/">MoviesHub</Link>
          </h1>
        </div>
        <div className="flex gap-5 flex-row self-center justify-center content-center">
          <Authorized
            role="admin"
            authorized={
              <>
                <div>
                  <Link to="/actors">Actors</Link>
                </div>
                <div>
                  <Link to="/genres">Genres</Link>
                </div>
                <div>
                  <Link to="/movies">Movies</Link>
                </div>
                <div>
                  <Link to="/movie-theaters">Movie Theaters</Link>
                </div>
              </>
            }
          />
          <div>
            <Link to="/movies/filter">Movies Filter</Link>
            <Authorized
              authorized={<>
                <span className="ml-5 mr-5">{getUserEmail()}</span>
                <Button onClick={() => {
                  logout();
                  update([])
                }}>Log out</Button>
              </>}
              notAuthorized={
                <>
                  <Link className="ml-5 mr-5" to={"/register"}>Register</Link>
                  <Link to={"/login"}>Login</Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
