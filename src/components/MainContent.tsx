export default function MainContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2 py-1 lg:py-4 my-2 lg:my-4 xl:my-8 px-1 lg:px-4 bg-primary-light rounded-lg h-full">
      {children}
    </main>
  );
}
