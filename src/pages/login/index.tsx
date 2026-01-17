import { Link } from "react-router-dom";
import { Container } from "../../components/container";
import logoImg from "../../assets/logo.png";

import { Input } from "../../components/input/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .email("Insira um email válido")
    .min(1, "O campo email é obrigatório"),
  password: z.string().min(1, "O campo senha é obrigatório"),
});
type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }
  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} className="w-full" alt="" />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-xl w-full rounded-lg"
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu email"
              name="email"
              error={errors.email?.message}
              register={register}
            ></Input>

            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            ></Input>
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
          >
            Acessar
          </button>
        </form>
        <Link to={"/register"}>Ainda não possui uma conta? Clique aqui </Link>
      </div>
    </Container>
  );
}
