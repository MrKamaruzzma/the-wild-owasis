import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import useCreateBooking from "./useCreateBooking";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateBookingForm({ onClose }) {
  const { register, handleSubmit,  formState ,reset} = useForm();
  const { errors } = formState;

  const { createBooking, isCreating } = useCreateBooking();

  function onSubmit(data) {
    createBooking(
        { ...data },
        {
            onSuccess: () => {
              reset();
              onClose?.();
            },
          }
      )
    console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin id" error={errors?.cabinId?.message}>
        <Input
          type="text"
          id="cabinId"
          {...register("cabinId", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Guest id" error={errors?.guestId?.message}>
        <Input
          type="text"
          id="guestId"
          {...register("guestId", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Guest Name" error={errors?.guestName?.message}>
        <Input
          type="text"
          id="guestName"
          {...register("guestName", { required: "This field is required" })}
        />
      </FormRow>

      {/* <FormRow label="Date" error={errors?.created_at?.message}>
        <Input
          type="date"
          id="created_at"
          {...register("created_at", {
            required: "This field is required",
          })}
        />
      </FormRow> */}
      {/* <FormRow label="Status" error={errors?.Status?.message}>
        <Input
          type="text"
          id="Status"
          {...register("Status", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      <FormRow label="Paid Amount" error={errors?.isPaid?.message}>
        <Input
          type="number"
          id="isPaid"
          defaultValue={0}
          {...register("isPaid", {
            required: "This field is required",
          })}
        />
      </FormRow>

      

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>

        <Button>{isCreating ?  <SpinnerMini/> : " Create Booking"}</Button>
      </FormRow>
    </Form>
  );
}
CreateBookingForm.propTypes = {
  onClose: PropTypes.bool,
  cabinToEdit: PropTypes.node,
};

export default CreateBookingForm;
