import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 5000,
      }),
  });
  return { createCabin, isCreating };
}

export default useCreateCabin;
