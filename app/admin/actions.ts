"use server";

import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: "Invalid input",
    };
  }

  const { username, password } = result.data;

  // Verify against environment variables
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await createSession("admin");
    redirect("/admin");
  } else {
    return {
      error: "Invalid username or password",
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
