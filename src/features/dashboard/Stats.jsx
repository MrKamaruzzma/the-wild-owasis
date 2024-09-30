import PropTypes from "prop-types";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  // HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  //HiOutlineCalendarDays,
  //HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays }) {
  // 1
  const numBooking = bookings.length;
  // console.log(confirmedStays);
  // console.log(numBooking);
  // 2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3
  const checkins = confirmedStays.length;

  // 4
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );

  console.log(occupation);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation) + "%"}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array.isRequired, // Correcting the type of bookings to array
  confirmedStays: PropTypes.any.isRequired, // You can specify the correct type based on your needs
  numDays: PropTypes.any.isRequired,
  cabinCount: PropTypes.any.isRequired,
};

export default Stats;
