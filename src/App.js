import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/repositories");

      setRepositories([...repositories, ...response.data]);
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: `http://localhost:3000/${Date.now()}`,
      title: `Novo projeto ${Date.now()}`,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepositories(
        repositories.filter((repository) => {
          return repository.id !== id;
        })
      );
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
