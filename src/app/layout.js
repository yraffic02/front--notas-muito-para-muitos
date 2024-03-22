"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer />
        <Header />
        {children}
      </body>
    </html>
  );
}
