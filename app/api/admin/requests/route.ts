import { NextResponse } from "next/server"

// Mock service requests data
const requests = [
  {
    id: 1,
    user_name: "Rajesh Kumar",
    service_name: "Plumbing",
    status: "completed",
    price: 800,
    created_at: "2024-01-15T10:00:00Z",
    vendor_name: "Ramesh Plumber",
  },
  {
    id: 2,
    user_name: "Priya Sharma",
    service_name: "Electrical",
    status: "in_progress",
    price: 1200,
    created_at: "2024-01-16T14:30:00Z",
    vendor_name: "Suresh Electrician",
  },
  {
    id: 3,
    user_name: "Tech Solutions Ltd",
    service_name: "Cleaning",
    status: "assigned",
    price: 500,
    created_at: "2024-01-17T09:15:00Z",
    vendor_name: "Cleaning Services Co",
  },
]

export async function GET() {
  return NextResponse.json(requests)
}
