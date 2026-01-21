import { supabase } from "./supabaseClient";

export async function uploadAvatar(
  userId: string,
  file: File
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
