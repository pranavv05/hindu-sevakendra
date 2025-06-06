import { NextResponse } from "next/server"

// Mock stats data
const stats = {
  totalVendors: 15,
  pendingApprovals: 3,
  totalRevenue: 45000,
  activeRequests: 8,
}

export async function GET() {
  return NextResponse.json(stats)
}
