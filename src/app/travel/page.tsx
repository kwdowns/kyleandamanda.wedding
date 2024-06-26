import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel | Kyle and Amanda",
};

export default function Travel() {
  return (
    <div className="w-full mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2">
      <h1 className="text-center text-4xl font-semibold">Travel</h1>
    </div>
  );
}
