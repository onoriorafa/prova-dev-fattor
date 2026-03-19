"use server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const statusBaseUrl = process.env.FATTOR_BASE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key")?.trim();

  if (!key) {
    return NextResponse.json(
      { message: "Parâmetro key é obrigatório" },
      { status: 400 },
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session?.token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${statusBaseUrl}/status/${encodeURIComponent(key)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.session.token}`,
        },
      },
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Erro ao consultar status no Fattor",
          statusCode: response.status,
          payload,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(payload ?? { message: "Resposta sem conteúdo" });
  } catch {
    return NextResponse.json(
      { message: "Falha ao consultar status no Fattor" },
      { status: 502 },
    );
  }
}
