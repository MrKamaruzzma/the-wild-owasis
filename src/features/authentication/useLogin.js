import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importing necessary hooks from react-query for mutation handling
import { login as loginApi } from "../../services/apiAuth"; // Importing login API function
import { useNavigate } from "react-router-dom"; // For navigation after successful login
import { toast } from "react-toastify"; // Importing toast for success/error notifications

export function useLogin() {
  const queryClient = useQueryClient(); // Get the Query Client to interact with React Query's cache
  const navigate = useNavigate(); // Hook to programmatically navigate users to different routes

  // Defining the mutation for logging in the user
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }), // Call login API with email and password
    onSuccess: (user) => {
      // If login is successful
      queryClient.setQueryData(["user"], user.user); // Update user data in the cache under the 'user' key
      toast.success("You have successfully logged in"); // Display success message
      navigate("/dashboard"); // Navigate to the dashboard page
    },
    onError: (err) => {
      // If login fails
      console.log("ERROR", err); // Log the error for debugging
      toast.error("Login details email and password are Incorrect"); // Show error message
    },
  });

  // Return the login mutation function and loading state
  return { login, isLoading };
}
