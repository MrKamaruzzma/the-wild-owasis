import { useForm } from "react-hook-form"; // React Hook Form for managing form state and validation
import Button from "../../ui/Button"; // Custom Button component
import Form from "../../ui/Form"; // Custom Form component
import FormRow from "../../ui/FormRow"; // Custom component for laying out form rows
import Input from "../../ui/Input"; // Custom Input component
import { useSignUp } from "./useSignup"; // Custom hook for signup functionality
import SpinnerMini from "../../ui/SpinnerMini"; // Custom mini loading spinner component
// import { useNavigate } from "react-router-dom"; // Navigation hook (currently commented out)

// Email validation regex: /\S+@\S+\.\S+/

function SignupForm() {
  // Destructure form-related methods from useForm hook
  const { register, getValues, handleSubmit, formState, reset } = useForm();
  const { errors } = formState; // Destructure errors from form state
  const { signup, isLoading } = useSignUp(); // Destructure signup function and isLoading state from custom useSignUp hook

  // Function that handles form submission
  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        // Reset form fields after the signup process completes
        onSettled: () => reset(),
      }
    );
    console.log({ fullName, email, password }); // Debugging/logging the submitted form data
  }

  // const navigate = useNavigate(); // Hook for navigation (commented out)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Full name input field */}
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading} // Disable the input while loading
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })} // Register the fullName field with validation
        />
      </FormRow>

      {/* Email address input field */}
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isLoading} // Disable the input while loading
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address", // Regex validation for email format
            },
          })}
        />
      </FormRow>

      {/* Password input field */}
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading} // Disable the input while loading
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Password should be mini 8 char" }, // Password minimum length validation
          })}
        />
      </FormRow>

      {/* Password confirmation input field */}
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading} // Disable the input while loading
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password should be same", // Validate that password confirmation matches the password
          })}
        />
      </FormRow>

      {/* Buttons for form actions */}
      <FormRow>
        {/* Reset button */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        {/* Submit button with a spinner if loading */}
        <Button>{!isLoading ? "Create new user" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
