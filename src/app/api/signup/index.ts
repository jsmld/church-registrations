import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Set this in your .env.local
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { CPF, Nome, Cidade, "Data de Nacimento": DataDeNacimento } = data;

    if (!CPF || !Nome || !Cidade || !DataDeNacimento) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO users (cpf, nome, cidade, data_de_nacimento) VALUES ($1, $2, $3, $4)',
      [CPF, Nome, Cidade, DataDeNacimento]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}