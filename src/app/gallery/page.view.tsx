"use client";

import PhotoGallery from "@/components/PhotoGallery";
import { images, engagement_photos } from "../../data/galleryImages";

export function GalleryView() {
  return (
    <PhotoGallery
      photos={images.concat(engagement_photos)}
      useLightbox={true}
    />
  );
}
