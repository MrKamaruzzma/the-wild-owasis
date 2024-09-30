import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newcabin, id) {
  // console.log(newcabin, id);
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newcabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //  https://ikcgmuvkxbvqayyfjqhw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1) create a cabin

  let query = supabase.from("cabins");

  //  1 ) Create

  if (!id) query = query.insert([{ ...newcabin, image: imagePath }]);

  // 2) edit
  if (id) query = query.update({ ...newcabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created ${error.message} url`);
  }
  // 2)  upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);

  // 3) delete cabin if there was error as uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      `Cabin image could not be uploaded ${storageError.message} url`
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted ${error.message} url`);
  }
  return data;
}
