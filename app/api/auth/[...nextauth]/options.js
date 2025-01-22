import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { toast } from 'react-toastify'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        // console.log('authorize called with credentials:', credentials)

        try {
          const response = await axios.post(
            'https://todos-api-aeaf.onrender.com/api/v1/auth/login',
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          const { email, name, token } = response.data.data

          // console.log('Received response from API:', response.data)
          // console.log('Returning user data to JWT:', { email, name, token })
          if (token) {
            return { id: email, email, name, token }
          }

          return null
        } catch (error) {
          // console.error('Error during login request:', error.response)
          const errorMessage =
            error.response?.data?.msg || 'Invalid credentials'
          throw new Error(errorMessage) // Pass this error to NextAuth
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT as the session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log('JWT callback - user:', user)
        token.email = user.email
        token.name = user.name
        token.token = user.token // Store token in JWT token
      }
      // console.log('JWT callback - token:', token)
      return token
    },
    async session({ session, token }) {
      // console.log('Session callback - token:', token)
      session.user = {
        email: token.email,
        name: token.name,
        token: token.token, // Pass token into the session
      }
      // console.log('Session callback - session:', session)
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
