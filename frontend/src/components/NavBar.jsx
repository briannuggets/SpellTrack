import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { clearCredentials } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="nav-bar center-content">
      <Link to="/">SpellTrack</Link>
      {userInfo ? (
        <div className="nav-links">
          <Link to="/profile" className="underline-link">
            View Profile
          </Link>
          <Link className="underline-link" onClick={logoutHandler}>
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login" className="underline-link">
            Login
          </Link>
          <Link to="/register" className="underline-link">
            Create an Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
