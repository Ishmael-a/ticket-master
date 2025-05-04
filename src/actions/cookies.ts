"use server";

import { cookies } from "next/headers";

export const getCookieByKey = async (key: string): Promise<string | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie ? cookie.value : null;
};

export const setCookie = async (key: string, value: string): Promise<void> => {
  (await cookies()).set(key, value);
};

export const deleteCookieByKey = async (key: string): Promise<void> => {
  (await cookies()).delete(key);
};


