import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

export function DashboardHeader() {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar Carro</Link>

      <button
        className="ml-auto cursor-pointer hover:text-black"
        onClick={handleLogout}
      >
        Sair da conta
      </button>
    </div>
  );
}
