import Sidebar from "@/components/Sidebar";

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

  return (
    <main
      className="flex h-screen w-full font-inter"
      style={{ border: "5px solid red" }}
    >
      <Sidebar user={loggedIn} />
      {children}
    </main>
  );
}
