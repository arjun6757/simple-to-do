export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className="w-screen h-dvh flex justify-center items-center"
      >
        {children}
      </div>
  );
}
