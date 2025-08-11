import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Set this in your .env.local
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      cpf,
      name,
      email,
      gender,
      marital_status,
      birth_date,
      age,
      phone,
      city,
      state,
      neighborhood,
      street,
      street_number,
      complement,
    } = data;

    for (const field in data) {
      if (field === "compelement") continue;
      if (field) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    if (cpf.length == 11) {
      return NextResponse.json(
        { error: "CPF must be 11 characters long" },
        { status: 400 }
      );
    }
    if (name.length < 3) {
      return NextResponse.json(
        { error: "Name must be at least 3 characters long" },
        { status: 400 }
      );
    }
    if (
      email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    if (!gender) {
      return NextResponse.json(
        { error: "Gender is required" },
        { status: 400 }
      );
    }
    if (!marital_status) {
      return NextResponse.json(
        { error: "Marital status is required" },
        { status: 400 }
      );
    }
    if (!birth_date) {
      return NextResponse.json(
        { error: "Birth date is required" },
        { status: 400 }
      );
    }
    if (!age || isNaN(age) || age < 0) {
      return NextResponse.json(
        { error: "Age must be a valid positive number" },
        { status: 400 }
      );
    }
    if (!phone || phone.length < 15) {
      return NextResponse.json(
        { error: "Phone must be at least 15 characters long" },
        { status: 400 }
      );
    }
    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    //23505 - unique_violation
    /*  await pool.query(
      "INSERT INTO users (cpf, nome, cidade, data_nacimento) VALUES ($1, $2, $3, $4)",
      [cpf, nome, cidade, data_nascimento]
    );
 */
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during signup:", error);
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
