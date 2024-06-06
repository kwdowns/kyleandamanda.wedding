import React from "react";
import Image from "next/image";

// Refresh this list of exports by running exports.ps1 in the root
import * as gallery from "@/app/exports"

export default function Gallery() {
  return (
    <div className="mt-8 flex xs:flex-col flex-wrap gap-2 ml-2 mr-2">
      {gallery.images.map((photo,i) => (
          <Image
            src={photo}
            key={i}
            alt=""
            className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
          />
        ))}
    </div>
  );
}

