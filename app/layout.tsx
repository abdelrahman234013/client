// import type { Metadata } from "next";
import { Space_Mono, Poppins } from "next/font/google";
import { Providers } from "./utils/Provider";
import { Toaster } from "react-hot-toast";
import PageTransition from '../app/components/Transitions/PageTransition'
import "./globals.css";
import StairsTransition from "./components/Transitions/StairsTransition";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen`}
        style={{
          backgroundImage: `url('/download (23).jpeg')`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center center", // Add this line
        }}
        >
       <Providers>
          <Toaster
            toastOptions={{
              style: {
                background: "rgb(51 65 85)",
                color: "#fff",
                zIndex: 9999999,
              },
            }}
            />
    
            <PageTransition>
          {children}
       </PageTransition>
        </Providers>
      </body>
    </html>
  );
}



