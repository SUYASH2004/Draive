"use client";
import "./globals.css";
import { RoleProvider } from "./components/RoleContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="bg-gradient-to-br from-emerald-50 via-white to-green-50 min-h-screen">
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
