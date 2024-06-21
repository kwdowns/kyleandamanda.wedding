"use client";

import PhotoGallery from "@/components/PhotoGallery";
import { images } from "@/data/exports";

export function GalleryView() {
  return <PhotoGallery photos={images} useLightbox={true} />;
}
