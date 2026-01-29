import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { supabase } from "../../services/supabaseClient";
import { Link } from "react-router-dom";
interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  user_id: string;
  car_images: {
    path: string;
    is_cover: boolean;
  }[];
}
export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  useEffect(() => {
    async function loadCars() {
      const { data, error } = await supabase
        .from("cars")
        .select(
          `
          id,
          name,
          year,
          price,
          city,
          km,
          user_id,
          car_images (
            path,
            is_cover
          )
        `,
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error);
        return;
      }
      setCars(data as CarsProps[]);
    }
    loadCars();
  }, []);

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  function getCoverImage(images: CarsProps["car_images"]) {
    if (!images || images.length === 0) return null;

    return images.find((img) => img.is_cover)?.path ?? images[0].path;
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 border-gray-200 outline-none rounded-lg h-9 px-3 "
          type="text"
          placeholder="Digite nome do carro"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados, em todo Brasil
      </h1>

      <main className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.user_id}`}>
            <section className="w-full bg-white rounded-lg">
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{
                  display: loadImages.includes(car.id) ? "none" : "block",
                }}
              ></div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all
            "
                src={`https://xsvwlncjmgejdaoprqhx.supabase.co/storage/v1/object/public/car-images/${getCoverImage(car.car_images)}`}
                alt={car.name}
                onLoad={() => handleImageLoad(car.id)}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">
                  Ano {car.year} - {car.km} KM
                </span>
                <strong className="text-black font-medium text-xl">
                  {car.price}
                </strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-black">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
