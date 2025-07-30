import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "साईराम कॉम्प्युटर - Digital Services & Internet Center",
  description: "साईराम कॉम्प्युटर, संपूर्ण साईबर सेवा मोबाईल आप्प्लिकेशन्स",
  manifest: "/manifest.json",
  themeColor: "#2A4784",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "साईराम कॉम्प्युटर",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="साईराम कॉम्प्युटर" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
