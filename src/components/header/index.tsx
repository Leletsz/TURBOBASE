import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { FiLogIn, FiUser } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
export function Header() {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex items-center w-full max-w-7xl justify-between px-4 mx-auto">
        <Link to="/">
          <img className="w-60" alt="Logo do site" src={logoImg}></img>
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className="border-2 rounded-full p-1 border-gray-900">
              <FiUser size={24} color="#000" />
            </div>
          </Link>
        )}
        {!loadingAuth && !signed && (
          <Link
            to="/login"
            className="border-2 cursor-pointer rounded-full p-1 border-gray-900"
          >
            <FiLogIn size={24} color="#000" />
          </Link>
        )}
      </header>
    </div>
  );
}
