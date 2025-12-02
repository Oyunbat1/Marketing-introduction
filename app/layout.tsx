"use client"
import type { Metadata } from "next";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo-client"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <ApolloProvider client={client}>
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ApolloProvider>
      </body>
    </html>
  );
}
