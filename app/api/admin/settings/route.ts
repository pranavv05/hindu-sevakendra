import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()

    // In a real application, update the database
    console.log(`Setting ${key} updated to ${value}`)

    return NextResponse.json({
      message: "Settings updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 })
  }
}
