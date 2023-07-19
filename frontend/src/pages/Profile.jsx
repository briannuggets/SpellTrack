import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="fill-page center-content">
      <h1>Welcome, {userInfo.name}.</h1>
    </div>
  );
};

export default Profile;
