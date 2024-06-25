import React, { MouseEventHandler, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { PhotoAlbum } from "react-photo-album";
import Lightbox, { RenderSlideProps, Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

interface PhotoGalleryProps {
  photos: StaticImageData[];
  useLightbox: boolean;
  title?: string;
}

export default function PhotoGallery({
  photos,
  useLightbox,
  title,
}: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div className="mt-8">
      {title && (
        <div className="text-center">
          <h2>{title}</h2>
        </div>
      )}

      <PhotoAlbum
        photos={photos}
        renderPhoto={(props) =>
          GalleryImage({
            ...props,
            onClick: () => {
              setLightboxOpen(true);
              setLightboxIndex(
                photos.findIndex((photo) => photo.src === props.photo.src),
              );
            },
          })
        }
        layout="columns"
        columns={(containerWidth) => {
          if (containerWidth < 400) {
            useLightbox = false;
            setLightboxOpen(false);
            return 1;
          }
          if (containerWidth < 800) {
            return 2;
          }
          if (containerWidth < 1200) {
            return 3;
          }
          return 4;
        }}
      />
      {useLightbox && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={photos.map((image) => ({ src: image.src }))}
          render={{
            slide: (props: RenderSlideProps<Slide>) =>
              LightboxImage({
                ...props,
                lookupStaticImageData: (src) =>
                  photos.find((photo) => photo.src === src),
              }),
          }}
          on={{
            view: (p) => {
              setLightboxIndex(p.index);
            },
          }}
        />
      )}
    </div>
  );
}

interface GalleryImageProps {
  photo: StaticImageData;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function GalleryImage({ photo, onClick }: GalleryImageProps) {
  return (
    <div onClick={onClick}>
      <Image src={photo} alt="" className="py-2" />
    </div>
  );
}

interface LightboxImageProps extends RenderSlideProps<Slide> {
  lookupStaticImageData: (src: string) => StaticImageData | undefined;
}

function LightboxImage({
  slide,
  offset,
  rect,
  lookupStaticImageData,
}: LightboxImageProps): React.JSX.Element | undefined {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const galleryImage = lookupStaticImageData(slide.src);
  if (!galleryImage) {
    return undefined;
  }

  const width = !cover
    ? Math.round(
        Math.min(
          rect.width,
          (rect.height / galleryImage.height) * galleryImage.width,
        ),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(
          rect.height,
          (rect.width / galleryImage.width) * galleryImage.height,
        ),
      )
    : rect.height;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
      }}
    >
      <Image
        alt=""
        src={galleryImage}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
