"use server";

import { signInPath } from "@/app/paths";
import { getAuth } from "./get-auth";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signOut = async () => {
  const { session } = await getAuth();
  const cookieStore = await cookies();

  if (!session) {
    redirect(signInPath());
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect(signInPath());
};
