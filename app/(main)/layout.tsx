import {Header} from "@/components/Main/Layout/Header";
import {Footer} from "@/components/Main/Layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}