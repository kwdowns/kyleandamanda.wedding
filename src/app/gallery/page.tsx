"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { PhotoAlbum, type RenderPhotoProps } from "react-photo-album";
// Refresh this list of exports by running exports.ps1 in the root
import * as gallery from "@/app/exports"

export default function Gallery() {
  return (
      <PhotoAlbum
        photos={gallery.images}
        renderPhoto={NextJsImage}
        layout="masonry"
        defaultContainerWidth={800}
        padding={30}
        spacing={20}
        targetRowHeight={400}
        sizes={{
          size: "calc(100vw-40px)",
          sizes:[
            { viewport: "(max-width: 299px)", size: "calc(100vw-10px)" },
            { viewport: "(max-width: 599px)", size: "calc(100vw-20px)" },
            { viewport: "(max-width: 1199px)", size: "calc(100vw-30px)" }
          ]
        }}
      />
  );
}

function NextJsImage({ photo } : { photo: StaticImageData }) {
  return (
    <Image
      src={photo}
      alt=""
      className="py-2"
    />
  );
}