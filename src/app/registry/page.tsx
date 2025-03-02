import MainContent from "@/components/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registry | Kyle and Amanda",
};

export default function Registry() {
  return (
    <MainContent>
      <h1 className="text-4xl mt-4 text-center">Registry</h1>
      <p className="text-pretty my-4 text-lg">
        Thank you for considering a gift for our wedding! We are registered at
        the buisnesses listed below.
      </p>

      <div className="flex flex-col space-y-8 my-8 items-center">
        <RegistryLink
          displayName={"Amazon"}
          url={"https://www.amazon.com/wedding/share/kyleandamanda-wedding"}
        />
        <RegistryLink
          displayName={"Target"}
          url={"https://www.target.com/gift-registry/gift/meet-the-downs"}
        />
        <RegistryLink
          displayName="Fiesta Dinnerware"
          url={
            "https://www.myregistry.com/wedding-registry/amanda-claywell-and-kyle-downs-overland-park-ks/4574658"
          }
        />
      </div>

      <div className="">
        <p className="text-pretty text-lg">
          If you are shipping a gift, please ship to our home address at:
        </p>
        <address className="text-center">
          8515 Lowell Ave
          <br />
          Overland Park, KS 66212
        </address>
      </div>
    </MainContent>
  );
}

function RegistryLink({
  displayName,
  url,
}: {
  displayName: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target={"_blank"}
      referrerPolicy="no-referrer"
      className="text-2xl hover:text-tertiary-light bg-accent border-2 rounded-md p-3 drop-shadow-xl w-1/2 lg:w-2/5 text-center"
    >
      {displayName}
    </a>
  );
}
