import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  axios.get("http://localhost:8080/cadastros", config).then((response) => {
    setPosts(response.data);
  });

  function deletePost(id) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .delete(`http://localhost:8080/cadastros/${id}`, config)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch(() => {});
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
      post.bairro.toLowerCase().includes(search.toLowerCase()) ||
      post.cep.includes(search)
  );

  return (
    <div className="container-lista">
      <main className="container-main">
        <h1>Lista de Cadastros</h1>
        <div className="pesquisaTotal">
          <input
            type="text"
            placeholder="Pesquisar por nome, bairro ou CEP"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-4"
          ></input>
          <p style={{ color: "#f1f1f1" }}>
            <span>Total de cadastros: {filteredPosts.length}</span>
          </p>
        </div>
        <div className="container-lista-card">
          {filteredPosts.map((post, key) => {
            return (
              <div key={key}>
                <div className="card card-get">
                  <img src={imagemProfile} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{post.nomeCompleto}</h5>
                    <p className="card-text">{post.solicitacoes}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">CPF: {post.cpf}</li>
                    <li className="list-group-item">
                      Nascimento: {formatDate(post.nascimento)}
                    </li>
                    <li className="list-group-item">Bairro: {post.bairro}</li>
                    <li className="list-group-item">CEP: {post.cep}</li>
                  </ul>
                  <div className="card-body">
                    <div className="buttons-card">
                      <Link to={`/detalhe/${post.idCadastro}`}>
                        <button
                          type="button"
                          className="btn btn-primary btn-detalhes"
                        >
                          Mais Detalhes
                        </button>
                      </Link>

                      <Link
                        to={`/pessoaSolicitacoes/${post.idCadastro}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          type="button"
                          className="btn btn-dark btn-detalhes"
                        >
                          Solicitações
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal${key}`}
                      >
                        Deletar Cadastro
                      </button>
                    </div>
                    <div
                      className="modal fade"
                      id={`exampleModal${key}`}
                      tabIndex="-1"
                      aria-labelledby={`exampleModalLabel${key}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id={`exampleModalLabel${key}`}
                              style={{ color: "black" }}
                            >
                              Atenção
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Você tem Certeza que Deseja Excluir esse Cadastro?
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={() => deletePost(post.id)}
                            >
                              Sim
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Não
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Feed;
