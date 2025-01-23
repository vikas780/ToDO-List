import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  console.log('Request URL:', req.url) // Debug request URL

  // Extract the JWT token from cookies
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  })

  // console.log('Raw Token:', token)
  // console.log('Middleware Token:', token) // Debug token value

  const path = req.nextUrl.pathname // Extract the path from the URL
  // console.log('Path:', path)

  // Define public routes that don't require authentication
  const isPublicPath = ['/login', '/register'].includes(path)

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    // console.log('Redirecting authenticated user to home page.')
    return NextResponse.redirect(new URL('/tasks', req.url))
  }

  // Redirect unauthenticated users to login from private paths
  if (!isPublicPath && !token) {
    // console.log('Redirecting unauthenticated user to login.')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  console.log('Allowing request to proceed.')
  return NextResponse.next() // Proceed to the next middleware or route
}

export const config = {
  matcher: ['/login', '/register', '/tasks/:path*'], // Specify routes for middleware
}
