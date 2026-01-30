import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarsProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  whatsapp: string;
  km: string;
  description: string;
  user_id: string;
  car_images: {
    path: string;
    is_cover: boolean;
  }[];
}
export function CarDetail() {
  const [cars, setCars] = useState<CarsProps | null>(null);
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function loadCars() {
      const { data, error } = await supabase
        .from("cars")
        .select(
          `
            id,
            name,
            model,
            year,
            price,
            whatsapp,
            city,
            description,
            km,
            user_id,
            car_images (
              path,
              is_cover
            )
          `,
        )
        .eq("id", id)
        .single();
      if (!data) {
        navigate("/");
      }
      if (error) {
        console.log(error);
        return;
      }
      setCars(data as CarsProps);
    }
    loadCars();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Swiper
        slidesPerView={sliderPerView}
        pagination={{ clickable: true }}
        navigation
      >
        {cars?.car_images.map((image) => (
          <SwiperSlide>
            <img
              className="w-full h-96 object-cover"
              src={`https://xsvwlncjmgejdaoprqhx.supabase.co/storage/v1/object/public/car-images/${image.path}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {cars && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{cars?.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {cars?.price}</h1>
          </div>
          <p>{cars?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{cars?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{cars?.year}</strong>
              </div>
            </div>
          </div>
          <strong>Descrição:</strong>
          <p className="mb-4">{cars?.description}</p>
          <strong>Telefone:</strong>
          <p>{cars.whatsapp}</p>
          <a
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
            href={`https://api.whatsapp.com/send?phone=${cars?.whatsapp}&text=Olá vi esse ${cars?.name} e fiquei interessado`}
            target="_blank"
          >
            Conversar com Vendedor <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
}
