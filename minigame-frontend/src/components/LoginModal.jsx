import { useContext, useState } from "react";
import { UserContext } from "../domain/UserContext";

// Login modal component
const LoginModal = ({ onClose }) => {
  const {createUser} = useContext(UserContext);
  // state variables
  const [formMode, setFormMode] = useState("Sign in");
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // errors messages
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // password regex for sign up validation
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+?])[A-Za-z\d!@#$%^&*()_+?]{8,}$/;

  // handle submit for sign in and sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "", confirmPassword: "" };

    // validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // validate password for sign up
    if (formMode === "Sign up" && !PASSWORD_REGEX.test(password)) {
      newErrors.password =
        "Password needs 1 uppercase, 1 number, 1 special character";
    }

    // validate confirm password for sign up
    if (formMode === "Sign up" && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // set errors
    setErrors(newErrors);

    // if no errors, log validation passed
    if (!Object.values(newErrors).some((error) => error)) {
      createUser(username, email, password);
      console.log("Validation passed");
    }
  };

  // handle password change for sign up
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password:
        // if sign up, validate password
        formMode === "Sign up"
          ? PASSWORD_REGEX.test(value)
            ? ""
            : prev.password
          : "",
    }));
  };

  // handle confirm password change for sign up
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    // set confirm password
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        // if sign up, validate confirm password equal to password
        formMode === "Sign up" && password !== value
          ? "Passwords do not match"
          : "",
    }));
  };

  // handle email change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    // set email
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      // validate email
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format",
    }));
  };

  // handle email change
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    // set username
    setUsername(value);
    setErrors((prev) => ({
      ...prev,
      // validate email
      username: username.length >= 3
        ? ""
        : "At least 3 characters for username",
    }));
  };

  // notice words for sign in and sign up
  const notice =
    formMode === "login" ? "Don't have an account？" : "Have an account？";

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="w-full max-w-lg p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
            {formMode === "Sign in" ? "Sign in" : "Sign up"}
          </h2>
          {/* Close button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form for sign in and sign up */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            {/* Email input */}
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={email}
              onChange={handleEmailChange}
            />
            {/* Email error message */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Form for sign in and sign up */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              username
            </label>
            {/* username input */}
            <input
              type="username"
              id="username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={username}
              onChange={handleUsernameChange}
            />
            {/* username error message */}
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.username}
              </p>
            )}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            {/* Password input */}
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Password error message */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password input */}
          {formMode === "Sign up" && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {/* Confirm password error message */}
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Sign in or sign up button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all">
            {formMode === "Sign in" ? "Sign in" : "Sign up"}
          </button>

          {/* Notice words for sign in and sign up */}
          <div className="text-center mt-4">
            <span className="text-gray-600">{notice}</span>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 cursor-pointer ml-1 text-sm"
              onClick={() => {
                setFormMode(formMode === "Sign in" ? "Sign up" : "Sign in");
                setErrors({username: "", email: "", password: "", confirmPassword: "" });
                setConfirmPassword("");
              }}>
              {formMode === "Sign in" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
