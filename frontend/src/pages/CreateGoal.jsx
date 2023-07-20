import { useRef } from "react";
import { useAddGoalMutation } from "../slices/goalApiSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateGoal = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priorityRef = useRef(null);

  const navigate = useNavigate();

  const [addGoal] = useAddGoalMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      titleRef.current === null ||
      descriptionRef.current === null ||
      priorityRef.current === null
    ) {
      return;
    }
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const priority = priorityRef.current.value;

    try {
      const res = await addGoal({
        title,
        description,
        priority,
        status: false,
      }).unwrap();
      toast.success("Added goal", { theme: "dark" });
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, { theme: "dark" });
    }
  };

  return (
    <div className="form-container fill-page center-content-column">
      <h1>Create a Goal</h1>
      <form className="center-content-column" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" ref={titleRef} />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" ref={descriptionRef} />
        <label htmlFor="priority">Priority</label>
        <select name="priority" id="priority" ref={priorityRef}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateGoal;
