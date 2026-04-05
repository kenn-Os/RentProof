import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  
  // Mock callback for UI prototype
  // In a real app, this would exchange a code for a session
  console.log('Mock: Auth callback received')
  
  // Default to tenant dashboard for prototype
  return NextResponse.redirect(`${origin}/dashboard/tenant`)
}
