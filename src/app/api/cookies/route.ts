import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { error: "Cookie key is required" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const serverCookie = cookieStore.get(key);

  const cookieValue = serverCookie?.value || null;

  return NextResponse.json({ value: cookieValue });
}

// export async function POST(request: NextRequest) {
//   const { key, value } = await request.json();

//   if (!key) {
//     return NextResponse.json(
//       { error: "Cookie key is required" },
//       { status: 400 }
//     );
//   }

//   const response = NextResponse.json({ success: true });

//   response.cookies.set(key, value, {
//     path: "/", // Available on all pages
//     httpOnly: false, // Allow JavaScript access (for easier debugging)
//     maxAge: 60 * 5, // 5 minutes (in seconds)
//     sameSite: "strict",
//   });

//   console.log(`Setting cookie ${key}=${value}`);
//   console.log(`RESPONSE cookie `, response.cookies);

//   return response;
// }

export async function DELETE(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { error: "Cookie key is required" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  const cookieStore = await cookies();
  cookieStore.delete(key);


  return response;
}
