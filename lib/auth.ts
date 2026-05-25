import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        role: { label: 'Rol', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const artistRes = await fetch(`${API_URL}/auth/artists/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (artistRes.ok) {
            const data = await artistRes.json()
            return {
              id: String(data.artist.id),
              email: data.artist.email,
              name: data.artist.name,
              role: 'artist',
              accessToken: data.token,
              photoUrl: data.artist.photoUrl || null,
              firstName: data.artist.firstName || null,
              bio: data.artist.bio || null,
              city: data.artist.city || null,
              whatsappNumber: data.artist.whatsappNumber || null,
            }
          }

          const adminRes = await fetch(`${API_URL}/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (adminRes.ok) {
            const data = await adminRes.json()
            return {
              id: String(data.admin.id),
              email: data.admin.email,
              name: data.admin.name,
              role: 'admin',
              accessToken: data.token,
            }
          }

          return null
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session: updateData }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.accessToken = (user as any).accessToken
        token.photoUrl = (user as any).photoUrl
        token.firstName = (user as any).firstName
        token.bio = (user as any).bio
        token.city = (user as any).city
        token.whatsappNumber = (user as any).whatsappNumber
      }

      if (trigger === 'update' && updateData) {
        const data = updateData as any
        if (data.name) token.name = data.name
        if (data.email) token.email = data.email
        if (data.firstName !== undefined) token.firstName = data.firstName
        if (data.photoUrl !== undefined) token.photoUrl = data.photoUrl
        if (data.bio !== undefined) token.bio = data.bio
        if (data.city !== undefined) token.city = data.city
        if (data.whatsappNumber !== undefined) token.whatsappNumber = data.whatsappNumber
      }

      if (!user && token.accessToken && token.role === 'artist') {
        const data = await fetch(`${API_URL}/artists/${token.id}`, {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        }).then((r) => r.ok ? r.json() : null)

        if (data) {
          token.name = data.name
          token.email = data.email
          token.firstName = data.firstName
          token.photoUrl = data.photoUrl
          token.bio = data.bio
          token.city = data.city
          token.whatsappNumber = data.whatsappNumber
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session.user as any).role = token.role
        ;(session.user as any).accessToken = token.accessToken
        ;(session.user as any).photoUrl = token.photoUrl
        ;(session.user as any).firstName = token.firstName
        ;(session.user as any).bio = token.bio
        ;(session.user as any).city = token.city
        ;(session.user as any).whatsappNumber = token.whatsappNumber
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}
