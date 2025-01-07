import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resumade - AI Resume Builder",
  description: "Create the perfect resume with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom"
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
          card: "bg-gray-900",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-300",
          socialButtonsBlockButton: "border-gray-700 hover:bg-gray-800",
          socialButtonsBlockButtonText: "text-white",
          formFieldLabel: "text-gray-300",
          formFieldInput: "bg-gray-800 border-gray-700 text-white",
          footerActionLink: "text-purple-400 hover:text-purple-500"
        }
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
