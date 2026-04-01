import { authCookieName } from "@/lib/auth";

export async function POST() {
  const response = Response.json({ message: "Logout berhasil" });
  response.headers.append(
    "Set-Cookie",
    `${authCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
