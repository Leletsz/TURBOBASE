import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Container } from "../../components/container";
import logoImg from "../../assets/logo.png";

import { Input } from "../../components/input/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleLogout() {
      await supabase.auth.signOut();
    }
    handleLogout();
  }, []);

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(true);
      return;
    }

    navigate("/dashboard"); // ou a rota que você quiser
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
          {error && (
            <p className="text-red-500 mb-2 ml-1">
              Email ou senha estão incorretos!
            </p>
          )}
          <button
            type="submit"
            className="cursor-pointer bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
          >
            Acessar
          </button>
        </form>
        <Link to={"/register"}>
          Ainda não possui uma conta? <strong>Clique aqui</strong>{" "}
        </Link>
      </div>
    </Container>
  );
}
