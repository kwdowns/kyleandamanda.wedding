import MainContent from "@/components/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel | Kyle and Amanda",
};

export default function Travel() {
  return (
    <MainContent>
      <header>
        <h1 className="text-center text-4xl font-semibold">Travel</h1>
      </header>
      <article></article>
    </MainContent>
  );
}
