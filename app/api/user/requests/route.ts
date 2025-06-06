import { type NextRequest, NextResponse } from "next/server"

// Mock user requests data
const userRequests = [
  {
    id: 1,
    service_name: "Plumbing",
    description: "Kitchen sink repair needed",
    status: "completed",
    price: 800,
    vendor_name: "Ramesh Plumber",
    vendor_phone: "+91-9876543214",
    created_at: "2024-01-15T10:00:00Z",
    happy_code: "123456",
  },
  {
    id: 2,
    service_name: "Electrical",
    description: "Fan installation required",
    status: "in_progress",
    price: 600,
    vendor_name: "Suresh Electrician",
    vendor_phone: "+91-9876543215",
    scheduled_at: "2024-01-18T15:00:00Z",
    created_at: "2024-01-16T14:30:00Z",
  },
]

export async function GET() {
  return NextResponse.json(userRequests)
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // In a real application:
    // 1. Save to database
    // 2. Find nearest vendor
    // 3. Send notifications
    // 4. Generate Happy Code

    console.log("New service request:", requestData)

    // Mock successful request creation
    const newRequest = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...requestData,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Service request submitted successfully",
      request: newRequest,
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to submit request" }, { status: 500 })
  }
}
