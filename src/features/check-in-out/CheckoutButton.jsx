import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number.isRequired,
};
export default CheckoutButton;
