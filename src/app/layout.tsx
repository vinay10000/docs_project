import type { Metadata } from "next";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import { Inter } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Docs!",
  description: "Create and share docs with your team.",
};
const inter = Inter({
  subsets: ["latin"],
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster/>
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
