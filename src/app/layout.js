import Providers from "@/store/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Outlet from "@/middleware/Outlet";
import NextThemeProvider from "./NextThemeProvider";
import NavBar from "@/components/nav";
import AuthProvider from "./AuthProvider";
import MainFooter from "@/components/footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PHOTOSTAD",
  description: "PHOTOSTAD is a platform for final project",
};
<Head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@200&display=swap"
    rel="stylesheet"
  />
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="icon"
    href="/assets/image/mainlogo-blackv2.png"
    type="image/png"
    sizes="32x32"
  />
</Head>;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <AuthProvider>
              <NextThemeProvider>
                <NavBar />
                {children}
                <MainFooter />
              </NextThemeProvider>
            </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
