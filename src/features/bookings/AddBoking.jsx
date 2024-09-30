import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
//import CabinTable from "./CabinTable";

import Modal from "../../ui/Modal";
//import { useState } from "react";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
