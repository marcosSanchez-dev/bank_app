// app/(auth)/layout.tsx
import AuthSceneWrapper from "@/components/AuthSceneWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full">
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="hidden lg:block flex-1 relative">
        <AuthSceneWrapper />
      </div>
    </main>
  );
}
