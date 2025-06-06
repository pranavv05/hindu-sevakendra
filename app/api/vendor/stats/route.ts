import { NextResponse } from "next/server"

// Mock vendor stats data
const vendorStats = {
  totalEarnings: 15000,
  completedJobs: 25,
  pendingJobs: 3,
  approvalStatus: "approved",
}

export async function GET() {
  return NextResponse.json(vendorStats)
}
