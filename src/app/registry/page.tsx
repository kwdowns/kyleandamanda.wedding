import MainContent from "@/components/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registry | Kyle and Amanda",
};

export default function Registry() {
  return (
  <MainContent>
    <h1 className="text-4xl mt-4 text-center">Registry</h1>
    <p className="max-w-1/2 text-pretty my-4 text-lg">
      Thank you for considering a gift for our wedding! We are registered at Amazon and Target. If it gives you the option to select a day of the week for shipping, prefer either Monday or Friday.
    </p>
    <div className="flex flex-col space-y-8 mt-8 items-center">
      <RegistryLink displayName={"Amazon"} url={"https://www.amazon.com/wedding/share/kyleandamanda-wedding"}/>
      <RegistryLink displayName={"Target"} url={"https://www.target.com/gift-registry/gift/meet-the-downs"}/>
    </div>
  </MainContent>
  );
}

function RegistryLink({ displayName, url }: { displayName: string; url: string }) {
  return (
    <a 
      href={url} 
      target={"_blank"}
      referrerPolicy="no-referrer"
      className="text-2xl hover:text-tertiary-light bg-accent border-2 rounded-md p-3 drop-shadow-xl w-1/2 lg:w-2/5 text-center"
    >
      {displayName}
    </a>
  )
}
