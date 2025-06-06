import { type NextRequest, NextResponse } from "next/server"

// Mock database - In production, use a real database
const users = [
  { id: 1, name: "Admin User", email: "admin@hindusevakendra.org", password: "admin123", role: "admin" },
  { id: 2, name: "Rajesh Kumar", email: "rajesh@example.com", password: "user123", role: "user", category: "personal" },
  { id: 3, name: "Priya Sharma", email: "priya@example.com", password: "user123", role: "user", category: "society" },
  { id: 4, name: "Ramesh Plumber", email: "ramesh@example.com", password: "vendor123", role: "vendor" },
  { id: 5, name: "Suresh Electrician", email: "suresh@example.com", password: "vendor123", role: "vendor" },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
