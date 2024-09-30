import supabase, { supabaseUrl } from "./supabase"; // Importing the supabase instance and URL

// Signup function: Registers a new user using email, password, and additional metadata (like full name and avatar)
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName, // Storing the full name in metadata
        avatar: "", // Placeholder for avatar image
      },
    },
  });

  if (error) throw new Error(error.message); // Throw an error if the signup fails
  return data; // Return the data if successful
}

// Login function: Authenticates the user using email and password
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message); // Throw an error if login fails
  return data; // Return user session data
}

// Get current user: Retrieves the currently logged-in user's information
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // Get the current session
  if (!session.session) return null; // If there's no session, return null

  const { data, error } = await supabase.auth.getUser(); // Fetch the user's details
  if (error) throw new Error(error.message); // Throw an error if fetching user fails

  return data.user; // Return the user data
}

// Logout function: Signs the user out from the session
export async function logout() {
  let { error } = await supabase.auth.signOut(); // Sign out the user
  if (error) throw new Error(error.message); // Throw an error if logout fails
}

// Update current user: Updates the user's password, full name, and avatar image
export async function updateCurrentUser({ password, fullName, avatar }) {
  // Step 1: Update the user's password or full name
  let updateData;
  if (password) updateData = { password }; // If password is provided, update it
  if (fullName) updateData = { data: { fullName } }; // If full name is provided, update it

  const { data, error } = await supabase.auth.updateUser({ updateData }); // Call Supabase API to update user info
  if (error) throw new Error(error.message); // Throw an error if the update fails
  if (!avatar) return data; // If no avatar is provided, return the updated data

  // Step 2: Upload the avatar image to Supabase storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // Generate a unique filename for the avatar
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar); // Upload the avatar to the "avatars" bucket
  if (storageError) throw new Error(storageError.message); // Throw an error if the upload fails

  // Step 3: Update the user's avatar URL in the user metadata
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, // Save the public URL of the avatar
    },
  });

  if (error2) throw new Error(error2.message); // Throw an error if updating the avatar URL fails

  return updatedUser; // Return the updated user data
}

// Uncommented code for Google login
// export async function signInWithGoogle() {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "google", // Initiating Google OAuth login
//   });

//   if (error) {
//     console.error("Error during sign in:", error); // Log any errors that occur during sign-in
//   } else {
//     window.location.href = "/dashboard"; // Redirect to the dashboard after successful login
//   }
// }
