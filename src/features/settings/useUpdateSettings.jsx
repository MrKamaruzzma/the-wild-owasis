import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";

function useUpdateSettings() {
    const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 5000,
      }),
  });
  return { updateSettings, isUpdating };
}

export default useUpdateSettings;
