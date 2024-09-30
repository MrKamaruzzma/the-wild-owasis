import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}



// insert booking 

export async function createBooking(newbooking,id){


  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id); // Extract guest IDs

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);
  console.log(allGuestIds);
  console.log(allCabinIds);
  
  
  let query = supabase.from("bookings");

if (!id) query = query.insert([{ ...newbooking }]);

const { data, error } = await query.select("allGuestIds,allCabinIds").single();

  if (error) {
    console.error(error);
    throw new Error(`Booking could not be created ${error.message} url`);
  }
  // console.log(data)
return data;

}

























// async function createBookings() {
//   // First, fetch all guest and cabin IDs from the database
//   const { data: guestsIds } = await supabase
//     .from("guests")
//     .select("id")
//     .order("id");
//   const allGuestIds = guestsIds.map((cabin) => cabin.id); // Extract guest IDs

//   const { data: cabinsIds } = await supabase
//     .from("cabins")
//     .select("id")
//     .order("id");
//   const allCabinIds = cabinsIds.map((cabin) => cabin.id); // Extract cabin IDs

//   // Create final bookings array with updated guestId and cabinId
//   const finalBookings = bookings.map((booking) => {
//     // Calculate the number of nights for the booking
//     const cabin = cabins.at(booking.cabinId - 1); // Get the corresponding cabin
//     const numNights = subtractDates(booking.endDate, booking.startDate); // Calculate nights
//     const cabinPrice = numNights * (cabin.regularPrice - cabin.discount); // Calculate cabin price
//     const extrasPrice = booking.hasBreakfast
//       ? numNights * 15 * booking.numGuests // Calculate extras if breakfast is included
//       : 0; // Hardcoded breakfast price
//     const totalPrice = cabinPrice + extrasPrice; // Total price calculation

//     // Determine the status of the booking based on dates
//     let status;
//     if (
//       isPast(new Date(booking.endDate)) &&
//       !isToday(new Date(booking.endDate))
//     ) {
//       status = "checked-out"; // Past end date
//     }
//     if (
//       isFuture(new Date(booking.startDate)) ||
//       isToday(new Date(booking.startDate))
//     ) {
//       status = "unconfirmed"; // Future start date
//     }
//     if (
//       (isFuture(new Date(booking.endDate)) ||
//         isToday(new Date(booking.endDate))) &&
//       isPast(new Date(booking.startDate)) &&
//       !isToday(new Date(booking.startDate))
//     ) {
//       status = "checked-in"; // Ongoing booking
//     }

//     // Return the updated booking object
//     return {
//       ...booking,
//       numNights,
//       cabinPrice,
//       extrasPrice,
//       totalPrice,
//       guestId: allGuestIds.at(booking.guestId - 1), // Use actual guest ID
//       cabinId: allCabinIds.at(booking.cabinId - 1), // Use actual cabin ID
//       status,
//     };
//   });

//   console.log(finalBookings); // Log final bookings for debugging

//   // Insert final bookings into the database
//   const { error } = await supabase.from("bookings").insert(finalBookings);
//   if (error) console.log(error.message); // Log error if insertion fails
// }
