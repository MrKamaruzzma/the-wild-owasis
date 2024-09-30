import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User sign up successfully created");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Sign up details email and password are Incorrect");
    },
  });

  return { signup, isLoading };
}
