import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {createBooking as createBookingApi} from "../../services/apiBookings"

function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("New Booking successfully added");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 5000,
      }),
  });
  return { createBooking, isCreating };
}

export default useCreateBooking;
