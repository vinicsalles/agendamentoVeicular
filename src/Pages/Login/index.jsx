import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationPost = yup.object().shape({
    username: yup
      .string()
      .required("Email Obrigatório")
      .email("Email Inválido")
      .max(50, "O Email deve ter no máximo 50 caracteres"),
    password: yup.string().required("Senha Obrigatória"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const notifySuccess = () => toast.success("Login Efetuado com Sucesso!");

  const addPost = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      const tokenWithBearer = response.headers.authorization.replace(
        "Bearer ",
        ""
      );
      sessionStorage.setItem("token", tokenWithBearer);
      notifySuccess();
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (error) {
      toast.error("Credenciais Inválidas!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="d-flex flex-column justify-content-center align-items-center rounded-3 p-4 shadow-lg bg-azul-login"
        style={{ width: "320px" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <form
            className="d-flex flex-column gap-3 w-100"
            onSubmit={handleSubmit(addPost)}
          >
            <h1>Login</h1>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="Email"
                {...register("username")}
              />
              <p className="error-message" style={{ color: "red" }}>
                {errors.username?.message}
              </p>
            </div>
            <div className="form-group position-relative senhainput">
              <input
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                {...register("password")}
                tabIndex="2"
              />
            </div>
            <p className="error-message" style={{ color: "red" }}>
              {errors.password?.message}
            </p>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label
                className="form-check-label conectado-text"
                htmlFor="rememberMe"
              >
                Mantenha-me conectado
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <Link to={"/esqueceuSenha"}>Esqueceu a Senha?</Link>
            </div>
            <button type="submit" className="btn bg-secondary cor-btn-login">
              Login
            </button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
