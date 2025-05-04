import { cookies } from "next/headers";


export async function setToastMessage(message: string) {

  try {
    (await cookies()).set("toast", message, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 5, // 5 minutes
      sameSite: "strict",
    });

    return true;
  } catch (error) {
    console.error("Failed to set toast message:", error);
    return false;
  }
}
