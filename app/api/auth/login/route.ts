import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data.token) {
      return NextResponse.json({ message: data.message || "Login failed" }, { status: res.status });
    }

    // Save token in a cookie (optional) or just return to frontend
    return NextResponse.json({
      user: data.user,
      token: data.token,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
