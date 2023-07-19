import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="home-page fill-page center-content">
      {userInfo ? (
        <Dashboard />
      ) : (
        <div className="home-content center-content-column">
          <h1>Track Your Story</h1>
          <h2>
            Unlock your potential and embrace a world of enchantment through
            mindful habit cultivation.
          </h2>
          <div className="home-buttons">
            <Link to="/login">Sign in</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
