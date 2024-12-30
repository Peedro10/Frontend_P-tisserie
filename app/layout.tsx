import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image"; // Import pour gérer les images

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pâtisserie",
  description: "Site de démonstration pour une pâtisserie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 shadow-lg">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Logo cliquable */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg" // Chemin relatif vers votre logo
                alt="Logo Pâtisserie"
                width={60} // Largeur de l'image
                height={60} // Hauteur de l'image
                className="rounded-full hover:scale-110 transition-transform"
              />
            </Link>
            {/* Menu de navigation */}
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/articles"
                  className="hover:underline hover:text-yellow-300 transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/produits"
                  className="hover:underline hover:text-yellow-300 transition-colors"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/avis"
                  className="hover:underline hover:text-yellow-300 transition-colors"
                >
                  Avis
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
