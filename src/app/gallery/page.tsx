import { Metadata } from "next";
import { GalleryView } from "./page.view";

export const metadata: Metadata = {
  title: "Gallery | Kyle and Amanda",
};

export default async function Gallery() {
  return <GalleryView />;
}
