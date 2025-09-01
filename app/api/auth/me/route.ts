import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    // Make sure token includes Bearer
    const token = authHeader.startsWith("Bearer ") ? authHeader : `Bearer ${authHeader}`;

    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: token },
    });

    const data = await res.json();

    if (!res.ok || data.message) {
      return NextResponse.json({ message: data.message || "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
