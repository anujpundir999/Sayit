import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      {children}
      <Analytics />
    </>
  );
}
