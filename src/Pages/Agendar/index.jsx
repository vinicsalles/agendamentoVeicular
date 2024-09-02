import { useForm } from "react-hook-form";
import stylesAgendar from "../Agendar/styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

const validationPost = yup.object().shape({
  nomeCompleto: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  telefone: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  Nomecarro: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  Marca: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  Placa: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  DataAgendamento: yup
    .string()
    .required("Título Obrigatório")
    .max(40, "precisa ter 40 caracteres no máximo !"),
  Servico: yup
    .string()
    .required("Descrição Obrigatório")
    .max(100, "precisa ter 100 caracteres no máximo !"),
  conteudoServico: yup
    .string()
    .required("Conteúdo Obrigatório")
    .max(500, "precisa ter 500 caracteres no máximo !"),
});

function Posts() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addPost = (data) =>
    axios
      .post("https://665fa6d55425580055b0594f.mockapi.io/posts", data)
      .then(() => {
        console.log("Deu tudo certo");
        navigate("/");
      })
      .catch(() => console.log("Problemas na requisição"));

  return (
    <div className={stylesAgendar.divcadastro}>
      <main>
        <div
          className="card-post"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" height={200} width={300} />
          <Link to="/">
            <CircleArrowLeft style={{ color: "black" }} />
          </Link>

          <h1 style={{ textAlign: "center" }}>Agendar Veículo</h1>
          <hr />
          <form>
            <div className={stylesAgendar.cadastroMain}>
              <div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    CPF
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: 132.232.322-76"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Telefone
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: (24) 2222-3322"
                  />
                </div>
              </div>
              <div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Nome do Carro
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: Gol"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Marca
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: Volkswagen"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Placa
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: GVZ-1234"
                  />
                </div>
              </div>
              <div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Data Agendamento
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: 12/02/2022"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Serviço
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ex: Manutenção"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Conteúdo Serviço
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Ex: Manutenção de óleo e filtro"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Agendar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default Posts;
