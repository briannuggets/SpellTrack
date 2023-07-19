import { useState, useRef, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [register] = useRegisterMutation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current === null || passwordRef.current === null) {
      return;
    }
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, { theme: "dark" });
    }
  };

  return (
    <div className="sign-in-up-page fill-page center-content-column">
      <h1>Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="sign-in-up-form center-content-column"
      >
        <label htmlFor="name">Name*</label>
        <input type="text" id="name" name="name" required ref={nameRef} />
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" required ref={emailRef} />
        <label htmlFor="password">Password*</label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            required
            ref={passwordRef}
          />
          {passwordVisible ? (
            <AiOutlineEye onClick={togglePassword} />
          ) : (
            <AiOutlineEyeInvisible onClick={togglePassword} />
          )}
        </div>
        <div className="sign-in-up-submit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
