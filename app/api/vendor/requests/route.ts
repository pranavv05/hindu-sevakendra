import { NextResponse } from "next/server"

// Mock vendor requests data
const vendorRequests = [
  {
    id: 1,
    user_name: "Rajesh Kumar",
    user_phone: "+91-9876543211",
    service_name: "Plumbing",
    description: "Kitchen sink repair needed",
    location_address: "Sector 15, Noida",
    status: "completed",
    price: 800,
    commission: 16,
    vendor_payment: 784,
    created_at: "2024-01-15T10:00:00Z",
    happy_code: "123456",
  },
  {
    id: 2,
    user_name: "Priya Sharma",
    user_phone: "+91-9876543212",
    service_name: "Plumbing",
    description: "Bathroom pipe leak",
    location_address: "DLF Phase 1, Gurgaon",
    status: "in_progress",
    price: 600,
    commission: 12,
    vendor_payment: 588,
    scheduled_at: "2024-01-18T15:00:00Z",
    created_at: "2024-01-16T14:30:00Z",
  },
]

export async function GET() {
  return NextResponse.json(vendorRequests)
}
