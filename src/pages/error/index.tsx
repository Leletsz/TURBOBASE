import { Link } from "react-router-dom";
import errorImg from "../../assets/error.png";
import { Container } from "../../components/container";
function Error() {
  return (
    <Container>
      <div className=" flex flex-col h-screen justify-center items-center ">
        <img
          className="m-auto max-w-2xl relative top-10 "
          src={errorImg}
          alt=""
        />
        <div className="m-auto relative bottom-60  text-red-700 font-medium text-3xl">
          Error - Pagina não encontrada!
        </div>
        <Link className="relative bottom-80 font-medium" to={"/"}>
          Voltar
        </Link>
      </div>
    </Container>
  );
}

export default Error;
