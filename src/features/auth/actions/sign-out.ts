"use server";

import { signInPath } from "@/app/paths";
import { getAuth } from "./get-auth";
import { redirect } from "next/navigation";
import { invalidateSession } from "@/lib/lucia";
import { deleteSessionCookie } from "../utils/session-cookie";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  // await lucia.invalidateSession(session.id);

  // const sessionCookie = lucia.createBlankSessionCookie();

  // cookieStore.set(
  //   sessionCookie.name,
  //   sessionCookie.value,
  //   sessionCookie.attributes
  // );

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
