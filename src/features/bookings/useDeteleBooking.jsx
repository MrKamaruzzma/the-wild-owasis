import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { toast } from "react-toastify";

export function useDeleteBookig() {
  const queryClient = useQueryClient();

  const { mutate: deleteBoking, isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking successfullt deleted");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error,
  });
  return { deleteBoking, isDeletingBooking };
}
