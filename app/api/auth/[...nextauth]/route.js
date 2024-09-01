
import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/ConnectDB'

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        //   }),
        //   FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        //   }),
        //   GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        //   }),
        //   // Passwordless / email sign in
        //   EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        //   }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          if (account.provider === 'github') {
            await connectDB()
            const currentUser = await User.findOne({email: user.email})
            if(!currentUser){
              const newUser = await User.create({
                email: user.email,
                username : user.email.split('@')[0],
                profile_picture : user.image,
              })
            }
            return true
          }
        },
        async session({ session, user, token }) {
          try {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
          
        }

        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
        }
      }
  })

  export { authoptions as GET , authoptions as POST }