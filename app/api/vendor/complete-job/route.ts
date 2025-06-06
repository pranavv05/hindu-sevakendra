import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { requestId, happyCode } = await request.json()

    // In a real application:
    // 1. Validate Happy Code against database
    // 2. Update request status to completed
    // 3. Process payment to vendor
    // 4. Send notifications

    // Mock validation - accept any 6-digit code
    if (happyCode.length !== 6) {
      return NextResponse.json({ message: "Happy Code must be 6 digits" }, { status: 400 })
    }

    console.log(`Job ${requestId} completed with Happy Code: ${happyCode}`)

    return NextResponse.json({
      message: "Job completed successfully",
      paymentProcessed: true,
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to complete job" }, { status: 500 })
  }
}
