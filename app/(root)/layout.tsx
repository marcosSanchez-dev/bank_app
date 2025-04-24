// "use client";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
// import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: "Marco",
    $id: "string",
    email: "string",
    userId: "string",
    dwollaCustomerUrl: "string",
    dwollaCustomerId: "string",
    lastName: "Sanchez",
    address1: "string",
    city: "string",
    state: "string",
    postalCode: "string",
    dateOfBirth: "string",
    ssn: "string",
  };

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true); // Solo se ejecuta en el navegador
  // }, []);

  // if (!isMounted) return null; // Evita renderizar en el servidor

  return (
    <main className="flex h-screen w-full font-inter" style={{}}>
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
