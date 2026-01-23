import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import logoImg from "../../assets/logo.png";

import { Input } from "../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../services/auth";
import { useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await supabase.auth.signOut();
    }
    handleLogout();
  }, []);
  async function onSubmit(data: FormData) {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} className="w-full" alt="Logo" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-xl w-full rounded-lg p-6"
        >
          <Input
            type="text"
            placeholder="Digite seu nome completo"
            name="name"
            error={errors.name?.message}
            register={register}
          />

          <Input
            type="email"
            placeholder="Digite seu email"
            name="email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <button
            type="submit"
            className="mt-4 bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
          >
            Criar conta
          </button>
        </form>

        <Link to="/login">Já possui uma conta? Faça o login!</Link>
      </div>
    </Container>
  );
}
