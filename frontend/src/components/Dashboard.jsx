import { useGetGoalsQuery } from "../slices/goalApiSlice.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);

  const { data, refetch } = useGetGoalsQuery();
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data === undefined) {
      return;
    }
    if (data !== undefined) {
      const _goals = data.goals.map((goal, index) => (
        <div className="center-content" key={index}>
          <span>{goal.title}</span>
          <span>{goal.description}</span>
          <span>{goal.priority}</span>
          <span>{goal.status}</span>
        </div>
      ));
      setGoals(<>{_goals}</>);
    }
  }, [data]);

  return (
    <div className="dashboard fill-page center-content-column">
      <h1>Dashboard</h1>
      {data ? (
        <div className="center-content-column">{goals}</div>
      ) : (
        <div className="center-content-column">
          <h2>You have no current goals.</h2>
        </div>
      )}
      <Link to="/create" className="link-button">
        Create a goal
      </Link>
    </div>
  );
};

export default Dashboard;
