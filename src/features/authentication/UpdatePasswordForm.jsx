import { useForm } from "react-hook-form"; // React Hook Form for form management
import Button from "../../ui/Button"; // Custom Button component
import Form from "../../ui/Form"; // Custom Form component
import FormRow from "../../ui/FormRow"; // Custom component for organizing form rows
import Input from "../../ui/Input"; // Custom Input component
import SpinnerMini from "../../ui/SpinnerMini"; // Mini spinner component for loading state
import { useUpdateUser } from "./useUpdateUser"; // Custom hook for updating user details

function UpdatePasswordForm() {
  // Destructure form methods from useForm
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState; // Get form validation errors

  // Destructure updateUser function and isUpdatingUser state from custom useUpdateUser hook
  const { updateUser, isUpdatingUser } = useUpdateUser();

  // Function to handle form submission
  function onSubmit({ password }) {
    // Call updateUser function with the new password and reset the form on success
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    // Form component that triggers handleSubmit when submitted
    <Form onSubmit={handleSubmit(onSubmit)}>
      
      {/* Password input field */}
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message} // Display password error if exists
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password" // Helps password managers detect the field
          disabled={isUpdatingUser} // Disable input if the form is submitting
          {...register("password", {
            required: "This field is required", // Field validation: required
            minLength: {
              value: 8, // Minimum length for password
              message: "Password needs a minimum of 8 characters", // Error message if minimum length is not met
            },
          })}
        />
      </FormRow>

      {/* Confirm password input field */}
      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message} // Display confirm password error if exists
      >
        <Input
          type="password"
          autoComplete="new-password" // Helps password managers detect the field
          id="passwordConfirm"
          disabled={isUpdatingUser} // Disable input if the form is submitting
          {...register("passwordConfirm", {
            required: "This field is required", // Field validation: required
            validate: (value) =>
              getValues().password === value || "Passwords need to match", // Validate if the confirmed password matches the password
          })}
        />
      </FormRow>

      {/* Buttons for form actions */}
      <FormRow>
        {/* Reset button to clear the form */}
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>

        {/* Submit button with loading spinner if updating */}
        <Button>{!isUpdatingUser ? "Update password" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

