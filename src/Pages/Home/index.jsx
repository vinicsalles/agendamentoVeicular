import { Link } from "react-router-dom";
import stylesHome from "./styles.module.css";
import logo from "../../assets/logo.png";

const index = () => {
  return (
    <div className={stylesHome.containerHome}>
      <img src={logo} alt="logo" />
      <h1>Agendamento Veicular</h1>
      <div className={stylesHome.subcontainerHome}>
        <div>
          <Link to={"/agendar"}>
            <button>Sou Cliente</button>
          </Link>
        </div>
        <div>
          <Link to={"/login"}>
            {" "}
            <button>Sou Funcionário</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
