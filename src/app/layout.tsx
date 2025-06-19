import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkeletonTheme } from 'react-loading-skeleton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ramirols.vercel.app/'),
  title: "Ramiro Ls | Desarrollador de Software",
  description: "Este es mi portfolio personal desarrollado con Next.js, React y tecnologías modernas. El sitio está diseñado para mostrar mis proyectos, habilidades y experiencia profesional de una manera interactiva y atractiva.",
  keywords: "desarrollador web, full stack, next.js, react, portfolio, ramiro ls, ramiro ls portfolio, ramiro ls developer, ramiro ls software developer, ramiro ls software engineer, ramiro ls software architect, ramiro ls software developer portfolio, ramiro ls software engineer portfolio, ramiro ls software architect portfolio, programador web, programador full stack, programador next.js, programador react, programador portfolio, programador ramiro ls, programador ramiro ls portfolio, programador ramiro ls developer, programador ramiro ls software developer, programador ramiro ls software engineer, programador ramiro ls software architect, programador ramiro ls software developer portfolio, programador ramiro ls software engineer portfolio, programador ramiro ls software architect portfolio",
  authors: [{ name: "Ramiro Ls" }],
  creator: "Ramiro Ls",
  publisher: "Ramiro Ls",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://portfolio-ramirols.vercel.app/",
    siteName: "Ramiro Ls Portfolio",
    title: "Ramiro Ls | Desarrollador de Software",
    description: "Portfolio personal mostrando proyectos y habilidades en desarrollo web",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ramiro Ls Portfolio Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramiro Ls | Desarrollador de Software",
    description: "Portfolio personal mostrando proyectos y habilidades en desarrollo web",
    creator: "@ramirols",
    images: ["/twitter-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://portfolio-ramirols.vercel.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {children}
        </SkeletonTheme>
      </body>
    </html>
  );
}