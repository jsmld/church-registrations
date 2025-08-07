import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Set this in your .env.local
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { cpf, nome, cidade, data_nascimento } = data;

    if (!cpf || !nome || !cidade || !data_nascimento) {
      return NextResponse.json(
        { error: data }, 
        { status: 400 });
    }

    //23505 - unique_violation
    await pool.query(
      'INSERT INTO users (cpf, nome, cidade, data_nacimento) VALUES ($1, $2, $3, $4)',
      [cpf, nome, cidade, data_nascimento]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}