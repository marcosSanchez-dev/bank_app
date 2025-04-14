import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Marco", LastName: "Sanchez" };

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
