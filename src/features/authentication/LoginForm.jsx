import { useState } from "react";
import Button from "../../ui/Button"; // Custom Button component
import Form from "../../ui/Form"; // Custom Form component
import Input from "../../ui/Input"; // Custom Input component
import FormRowVertical from "../../ui/FormRowVertical"; // Custom component to display form fields vertically
import { useLogin } from "./useLogin"; // Custom hook for login functionality
import SpinnerMini from "../../ui/SpinnerMini"; // Custom mini loading spinner component
// import LoginWithGoogle from "./LoginWithGoogle"; // Optional Google login component (currently commented out)

function LoginForm() {
  // Initialize state for email and password fields with default values
  const [email, setEmail] = useState("jonas@gmail.com");
  const [password, setPassword] = useState("12345678");

  // Destructure the login function and isLoading state from the custom hook
  const { login, isLoading } = useLogin();

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // If email or password is missing, exit the function early
    if (!email || !password) return;

    // Call the login function from useLogin with email, password, and a callback function
    login(
      { email, password },
      {
        onSettled: () => {
          // Reset email and password fields after the login process completes
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Email input field with label */}
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This improves compatibility with password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state when input changes
          disabled={isLoading} // Disable the field when login is in progress
        />
      </FormRowVertical>

      {/* Password input field with label */}
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password" // Enable password managers to recognize the field
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state when input changes
          disabled={isLoading} // Disable the field when login is in progress
        />
      </FormRowVertical>

      {/* Submit button */}
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {/* Show loading spinner if isLoading is true, otherwise show "Login" text */}
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
