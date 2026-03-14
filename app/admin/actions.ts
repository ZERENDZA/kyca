"use server";

import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  const validUsername = process.env.ADMIN_USERNAME || "kyca_admin"
  const validPassword = process.env.ADMIN_PASSWORD || "Kyca@2026#Secure"

  console.log("LOGIN ATTEMPT:")
  console.log("Received username:", username)
  console.log("Received password:", password)
  console.log("Env username:", process.env.ADMIN_USERNAME)
  console.log("Env password:", process.env.ADMIN_PASSWORD)

  if (username === validUsername && password === validPassword) {
    await createSession("admin")
    revalidatePath("/admin", "layout")
    return { success: true }
  } else {
    return { error: "Invalid username or password" }
  }
}

export async function logout() {
  await deleteSession()
  redirect("/admin/login")
}
