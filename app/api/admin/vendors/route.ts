import { NextResponse } from "next/server"

// Mock vendor data
const vendors = [
  {
    id: 1,
    name: "Ramesh Plumber",
    email: "ramesh@example.com",
    phone: "+91-9876543214",
    service_type: "Plumbing",
    approval_status: "approved",
    registration_fee: 500,
    fee_paid: true,
  },
  {
    id: 2,
    name: "Suresh Electrician",
    email: "suresh@example.com",
    phone: "+91-9876543215",
    service_type: "Electrical",
    approval_status: "approved",
    registration_fee: 500,
    fee_paid: true,
  },
  {
    id: 3,
    name: "Cleaning Services Co",
    email: "cleaning@example.com",
    phone: "+91-9876543216",
    service_type: "Cleaning",
    approval_status: "pending",
    registration_fee: 500,
    fee_paid: false,
  },
  {
    id: 4,
    name: "Kumar Carpenter",
    email: "kumar@example.com",
    phone: "+91-9876543217",
    service_type: "Carpentry",
    approval_status: "pending",
    registration_fee: 500,
    fee_paid: false,
  },
]

export async function GET() {
  return NextResponse.json(vendors)
}
