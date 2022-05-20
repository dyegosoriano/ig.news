import NextAuth from 'next-auth'
import { query as q } from 'faunadb'

import GithubProvider from 'next-auth/providers/github'
import { fauna } from '../../../services/fauna'

export default NextAuth({
  providers: [
    GithubProvider({
      clientSecret: process.env.GITHUB_SECRET,
      clientId: process.env.GITHUB_ID
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await fauna.query(
          q.If(
            q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))),
            q.Create(q.Collection('users'), { data: { email: user.email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
          )
        )

        return true
      } catch (error) {
        return false
      }
    }
  }
})
