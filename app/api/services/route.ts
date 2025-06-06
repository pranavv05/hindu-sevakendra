import { NextResponse } from "next/server"

// Mock service types data
const serviceTypes = [
  { id: 1, name: "Plumbing", description: "Water pipe repairs, installations, and maintenance", base_price: 500 },
  { id: 2, name: "Electrical", description: "Electrical repairs, wiring, and installations", base_price: 600 },
  { id: 3, name: "Cleaning", description: "House cleaning, office cleaning, deep cleaning", base_price: 300 },
  { id: 4, name: "Carpentry", description: "Furniture repair, wood work, installations", base_price: 800 },
  { id: 5, name: "Painting", description: "Wall painting, home painting services", base_price: 1000 },
  { id: 6, name: "AC Repair", description: "Air conditioner repair and maintenance", base_price: 700 },
]

export async function GET() {
  return NextResponse.json(serviceTypes)
}
