import { FiTrash, FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/input";
import { useContext, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../services/supabaseClient";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano do carro é obrigatório"),
  km: z.string().nonempty("O KM do carro é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone invalido",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});
type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export function New() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  const carId = uuidv4();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;

    const image = e.target.files[0];

    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      alert("Envie uma imagem PNG ou JPEG");
      return;
    }

    handleUpload(image, carId);
  }

  async function handleUpload(file: File, carId: string) {
    const fileExt = file.name.split(".").pop(); // ✅ extensão correta
    const fileName = uuidv4();

    const filePath = `cars/${carId}/${fileName}.${fileExt}`;

    const { error } = await supabase.storage
      .from("car-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const imageItem: ImageItemProps = {
      name: `${fileName}.${fileExt}`,
      uid: carId, //
      previewUrl: URL.createObjectURL(file),
      url: filePath,
    };

    setCarImages((prev) => [...prev, imageItem]);
  }

  function onSubmit(data: FormData) {
    console.log(data);
  }
  async function handleDeleteImage(item: ImageItemProps) {
    const { error } = await supabase.storage
      .from("car-images")
      .remove([item.url]);

    if (error) {
      console.error("Erro ao deletar imagem:", error.message);
      return;
    }

    setCarImages((prev) => prev.filter((img) => img.url !== item.url));

    console.log("Imagem removida do storage com sucesso");
  }

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>
        {carImages.map((item) => (
          <div
            key={item.name}
            className="h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute cursor-pointer"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className=" mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Ônix 1.0"
            />
          </div>
          <div className="mb-3">
            <p className=" mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 flex PLUS MANUAL..."
            />
          </div>
          <div>
            <div className="flex w-full mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className=" mb-2 font-medium">Ano</p>
                <Input
                  type="text"
                  register={register}
                  name="year"
                  error={errors.year?.message}
                  placeholder="Ex: 2014/2014"
                />
              </div>
              <div className="w-full">
                <p className=" mb-2 font-medium">KM</p>
                <Input
                  type="text"
                  register={register}
                  name="km"
                  error={errors.km?.message}
                  placeholder="Ex: 23.230"
                />
              </div>
            </div>
            <div className="flex w-full mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className=" mb-2 font-medium">Telefone / Whatsapp</p>
                <Input
                  type="text"
                  register={register}
                  name="whatsapp"
                  error={errors.whatsapp?.message}
                  placeholder="Ex: 088988234512"
                />
              </div>
              <div className="w-full">
                <p className=" mb-2 font-medium">Cidade</p>
                <Input
                  type="text"
                  register={register}
                  name="city"
                  error={errors.city?.message}
                  placeholder="Ex: São paulo - SP"
                />
              </div>
            </div>
            <div className="w-full">
              <p className=" mb-2 font-medium">Preço</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Ex: R$ 230.000"
              />
            </div>
            <div className="w-full">
              <p className=" mb-2 font-medium">Descrição</p>
              <textarea
                className="border-2 w-full rounded-md h-24 px-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite a descrição completa sobre o carro..."
              />
              {errors.description && (
                <p className="mb-1 text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer h-10 rounded-md bg-zinc-900 text-white font-medium"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
