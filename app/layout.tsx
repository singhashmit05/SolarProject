import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "SolarHub - Solar Energy Platform",
  description: "Comprehensive solar energy platform for monitoring, community sharing, forecasting, and crowdfunding",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Chatbot />
      </body>
    </html>
  )
}
