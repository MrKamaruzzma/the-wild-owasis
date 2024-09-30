import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBoking";
//import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CreateBookingForm from "../features/bookings/CreateBookingForm";
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>

        <BookingTableOperations />
      </Row>
      <Row>
        {/* <CabinTable /> */}
        <BookingTable />
        <AddBooking>
          <CreateBookingForm />
        </AddBooking>
      </Row>
    </>
  );
}

export default Bookings;
