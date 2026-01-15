import { Container } from "../../components/container";

export function Home() {
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
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all
            "
            src="https://www.webmotors.com.br/wp-content/uploads/2025/12/05163804/Novo-Honda-WR-V-2026-11.webp"
            alt=""
          />
          <p className="font-bold mt-1 mb-2 px-2">Honda WR-V</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2026 - 0 km</span>
            <strong className="text-black font-medium text-xl">
              R$ 350.000
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">São Paulo - SP</span>
          </div>
        </section>
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all
            "
            src="https://www.webmotors.com.br/wp-content/uploads/2025/12/05163804/Novo-Honda-WR-V-2026-11.webp"
            alt=""
          />
          <p className="font-bold mt-1 mb-2 px-2">Honda WR-V</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2026 - 0 km</span>
            <strong className="text-black font-medium text-xl">
              R$ 350.000
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">São Paulo - SP</span>
          </div>
        </section>
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all
            "
            src="https://www.webmotors.com.br/wp-content/uploads/2025/12/05163804/Novo-Honda-WR-V-2026-11.webp"
            alt=""
          />
          <p className="font-bold mt-1 mb-2 px-2">Honda WR-V</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2026 - 0 km</span>
            <strong className="text-black font-medium text-xl">
              R$ 350.000
            </strong>
          </div>
          R$
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">São Paulo - SP</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
