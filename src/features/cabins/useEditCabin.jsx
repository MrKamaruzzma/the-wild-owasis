import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCabin } from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient(); // React Query's client to manage the cache

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // Define the mutation function to handle editing a cabin
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

    // What happens after a successful edit
    onSuccess: () => {
      toast.success("Cabin successfully edited"); // Show a success toast notification
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // Invalidate and refetch the "cabins" query to reflect the updated data
      });
    },

    // What happens if an error occurs during the edit
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 5000, // Display an error toast message for 5 seconds
      }),
  });

  return { editCabin, isEditing }; // Return the mutation function and the loading state
}

export default useEditCabin;
