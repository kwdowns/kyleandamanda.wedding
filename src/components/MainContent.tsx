export default function MainContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2">{children}</main>
  );
}
