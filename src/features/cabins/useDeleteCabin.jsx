import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 5000,
      }),
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
