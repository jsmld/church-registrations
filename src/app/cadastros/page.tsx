"use client";
import { handler } from "next/dist/build/templates/app-page";
import { useState } from "react";

export default function Page() {
  const [cpf, setCpf] = useState("");
  /* 
  
  field form
  
  
  */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result);
    } else {
      const error = await response.json();
      console.error("Error:", error);
    }
  };
  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <div>
        <form onSubmit={validateCPF}>
          <label htmlFor="CPF">CPF:</label>
          <input type="text" id="CPF" /> 8690518451561515
          <button>Enviar</button>
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Nome">Nome:</label> Raul Lloreda Gomez
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
