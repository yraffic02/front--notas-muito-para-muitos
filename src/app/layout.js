"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./globals.css";
import { Header } from "@/components/Header";

export default function RootLayout({ children }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        <title>Muitos para Muitos - Front</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
