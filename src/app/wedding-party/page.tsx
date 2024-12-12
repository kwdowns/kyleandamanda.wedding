import MainContent from "@/components/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Party | Kyle and Amanda",
};

export default function Travel() {
  return (
    <MainContent>
      <header>
        <h1 className="text-center text-4xl font-semibold">Wedding Party</h1>
      </header>
      <article>
        <p className="max-w-1/2 text-pretty my-4 text-lg"></p>
      </article>
    </MainContent>
  );
}
