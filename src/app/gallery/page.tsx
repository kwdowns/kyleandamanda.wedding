"use client";
import React from "react";
// Refresh this list of exports by running exports.ps1 in the root
import * as gallery from "@/app/exports";
import PhotoGallery from "@/components/PhotoGallery";
export default function Gallery() {
  console.log(`loading gallery images`);
  return <PhotoGallery photos={gallery.images} useLightbox={true} />;
}
