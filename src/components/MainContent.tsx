export default function MainContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="
    w-full 
    lg:w-4/5 
    xl:w-2/3 
    2xl:w-1/2 
    h-full
    mx-auto 
    my-2
    lg:my-4 
    xl:my-8 
    py-2 
    md:py-4 
    lg:py-6 
    px-2 
    lg:px-4 
    bg-primary-light 
    md:rounded-lg
    "
    >
      {children}
    </main>
  );
}
