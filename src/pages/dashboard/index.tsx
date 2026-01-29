import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/panelheader";
import { supabase } from "../../services/supabaseClient";
import { useEffect, useState } from "react";
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

export function Dashboard() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  useEffect(() => {
    async function loadCars() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setCars(data as CarsProps[]);
    }

    loadCars();
  }, []);

  async function handleDeleteCar(carId: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este carro?",
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("cars").delete().eq("id", carId);

    if (error) {
      console.error(error);
      alert("Erro ao excluir o carro");
      return;
    }

    setCars((prev) => prev.filter((car) => car.id !== carId));
  }

  return (
    <Container>
      <DashboardHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              onClick={() => handleDeleteCar(car.id)}
              className="absolute cursor-pointer bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow-2xl"
            >
              <FiTrash2 size={26} color="#000" />
            </button>

            <img
              className="w-full rounded-lg mb-2 max-h-70"
              src={`https://xsvwlncjmgejdaoprqhx.supabase.co/storage/v1/object/public/car-images/${car.car_images[0]?.path}`}
            />

            <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-700">
                Ano {car.year} / {car.km} km
              </span>
              <strong className="text-black font-bold mt-4">{car.price}</strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-6"></div>

            <div className="px-2 pb-2">
              <span className="text-black">{car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
