
import { supabase } from "./supabaseClient";

interface CreateCarData {
  user_id: string;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string;
  city: string;
  whatsapp: string;
  description: string;
}

export async function createCar(data: CreateCarData) {
  const { data: car, error } = await supabase
    .from("cars")
    .insert({
      user_id: data.user_id,
      name: data.name,
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      
    })
    .select("id")
    .single();

  if (error) throw error;

  return car.id;
}

export async function saveCarImages(
  carId: number,
  images: { url: string }[]
) {
  const payload = images.map((img, index) => ({
    car_id: carId,
    image_url: img.url,
    path: img.url,
    is_cover: index === 0,
  }));

  const { error } = await supabase
    .from("car_images")
    .insert(payload);

  if (error) throw error;
}



