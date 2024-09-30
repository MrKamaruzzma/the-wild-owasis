import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns"; // Import date-fns functions to check date statuses
import supabase from "../services/supabase"; // Import Supabase instance for database operations
import Button from "../ui/Button"; // Import custom Button component
import { subtractDates } from "../utils/helpers"; // Import helper function to calculate date differences

import { bookings } from "./data-bookings"; // Import sample booking data
import { cabins } from "./data-cabins"; // Import sample cabin data
import { guests } from "./data-guests"; // Import sample guest data
import SpinnerMini from "../ui/SpinnerMini"; // Import loading spinner component

// Functions to delete existing data from the database
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message); // Log error if deletion fails
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message); // Log error if deletion fails
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message); // Log error if deletion fails
}

// Functions to create new data in the database
async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message); // Log error if insertion fails
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message); // Log error if insertion fails
}

async function createBookings() {
  // First, fetch all guest and cabin IDs from the database
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id); // Extract guest IDs

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id); // Extract cabin IDs

  // Create final bookings array with updated guestId and cabinId
  const finalBookings = bookings.map((booking) => {
    // Calculate the number of nights for the booking
    const cabin = cabins.at(booking.cabinId - 1); // Get the corresponding cabin
    const numNights = subtractDates(booking.endDate, booking.startDate); // Calculate nights
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount); // Calculate cabin price
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests // Calculate extras if breakfast is included
      : 0; // Hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice; // Total price calculation

    // Determine the status of the booking based on dates
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    ) {
      status = "checked-out"; // Past end date
    }
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    ) {
      status = "unconfirmed"; // Future start date
    }
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    ) {
      status = "checked-in"; // Ongoing booking
    }

    // Return the updated booking object
    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1), // Use actual guest ID
      cabinId: allCabinIds.at(booking.cabinId - 1), // Use actual cabin ID
      status,
    };
  });

  console.log(finalBookings); // Log final bookings for debugging

  // Insert final bookings into the database
  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message); // Log error if insertion fails
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  // Function to upload all data to the database
  async function uploadAll() {
    setIsLoading(true); // Set loading state to true
    // Delete existing data in the correct order
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Create new data
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false); // Reset loading state
  }

  // Function to upload only bookings to the database
  async function uploadBookings() {
    setIsLoading(true); // Set loading state to true
    await deleteBookings(); // Delete existing bookings
    await createBookings(); // Create new bookings
    setIsLoading(false); // Reset loading state
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff", // Light blue background color
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3> {/* Heading for the uploader component */}

      {/* Button to upload all data */}
      <Button onClick={uploadAll}>
        {!isLoading ? "Upload ALL" : <SpinnerMini />} {/* Show loading spinner if isLoading is true */}
      </Button>

      {/* Button to upload only bookings */}
      <Button onClick={uploadBookings}>
        {!isLoading ? "Upload bookings ONLY" : <SpinnerMini />} {/* Show loading spinner if isLoading is true */}
      </Button>
    </div>
  );
}

export default Uploader; // Export the Uploader component for use in other files
