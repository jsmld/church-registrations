"use client";
import { useState } from "react";

export default function Page() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <form action="api/signup" method="POST">
        <label htmlFor="CPF">CPF:</label>
        <input type="text" id="CPF" />
        <label htmlFor="Nome">Nome:</label>
        <input type="text" id="Nome" />
        <label htmlFor="Cidade">Cidade:</label>
        <input type="text" id="Cidade" />
        <label htmlFor="Data de Nacimento">Data de Nacimento:</label>
        <input type="text" id="Data de Nacimento" />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
