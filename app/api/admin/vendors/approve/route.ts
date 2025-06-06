import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { vendorId, status } = await request.json()

    // In a real application, update the database
    console.log(`Vendor ${vendorId} ${status}`)

    return NextResponse.json({
      message: `Vendor ${status} successfully`,
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to update vendor" }, { status: 500 })
  }
}
