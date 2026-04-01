import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { authCookieName, createToken } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Input tidak valid" }, { status: 400 });
    }

    const admin = await db.admin.findUnique({ where: { email: parsed.data.email } });
    if (!admin) {
      return Response.json({ message: "Email atau password salah" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(parsed.data.password, admin.password);
    if (!isValidPassword) {
      return Response.json({ message: "Email atau password salah" }, { status: 401 });
    }

    const token = await createToken({
      sub: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const response = Response.json({ message: "Login berhasil" });
    response.headers.append(
      "Set-Cookie",
      `${authCookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
    );

    return response;
  } catch {
    return Response.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
