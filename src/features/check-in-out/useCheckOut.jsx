import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-toastify";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: IsCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error(`There was an error to checked out`),
  });
  return { checkout, IsCheckingOut };
}
