import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Annie Fei — Portfolio Archive", description: "An interactive portfolio presented as a tactile ring binder." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
