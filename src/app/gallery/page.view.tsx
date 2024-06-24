"use client";

import PhotoGallery from "@/components/PhotoGallery";
import { engagement, proposal } from "../../data/galleryImages";

export function GalleryView() {
  return (
    <>
      <PhotoGallery
        photos={proposal}
        useLightbox={true}
      />

      <PhotoGallery
        photos={engagement}
        useLightbox={true}
      />
    </>
  );
}
