import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Define auth paths
  const authPaths = ['/auth/signin', '/auth/signup']

  const isAuthPath = authPaths.some((p) => pathname.startsWith(p))

  // For UI prototype, we'll use a mock user
  // In a real app, this would check a session cookie
  const mockUser = {
    id: 'mock-user-123',
    email: 'tenant@example.com',
    role: 'tenant' // Change to 'landlord' or 'agent' to test other views
  }

  // Redirect to dashboard if trying to access auth pages while "logged in"
  if (mockUser && isAuthPath) {
    const url = request.nextUrl.clone()
    url.pathname = `/dashboard/${mockUser.role}`
    return NextResponse.redirect(url)
  }

  // If we wanted to "log out", we'd set mockUser to null and redirect to signin
  // but for now, we'll keep the dashboard accessible.
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|verify|api/confirm).*)',
  ],
}
