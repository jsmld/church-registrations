export default function Page() {
  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <form action="">
        <label htmlFor="CPF">CPF:</label>
        <input type="text" id="CPF" />
        <label htmlFor="Nome">Nome:</label>
        <input type="text" id="Nome" />
        <label htmlFor="Cidade">Cidade:</label>
        <input type="text" id="Cidade" />
        <label htmlFor="Data de Nacimento">Data de Nacimento:</label>
        <input type="text" id="Data de Nacimento" />
      </form>
    </main>
  );
}