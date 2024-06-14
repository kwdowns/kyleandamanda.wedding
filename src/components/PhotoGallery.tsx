import React from "react";
import Image, { StaticImageData } from "next/image";
import { PhotoAlbum } from "react-photo-album";
import Lightbox, { RenderSlideProps, Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import * as gallery from "@/app/exports";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

export default function PhotoGallery() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <PhotoAlbum
        photos={gallery.images}
        renderPhoto={GalleryImage}
        layout="masonry"
        defaultContainerWidth={800}
        padding={30}
        spacing={20}
        targetRowHeight={400}
        onClick={(click) => {
          console.log(click.index);
        }}
        sizes={{
          size: "calc(100vw-40px)",
          sizes: [
            { viewport: "(max-width: 299px)", size: "calc(100vw-10px)" },
            { viewport: "(max-width: 599px)", size: "calc(100vw-20px)" },
            { viewport: "(max-width: 1199px)", size: "calc(100vw-30px)" },
          ],
        }}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={gallery.images.map((image) => ({ src: image.src }))}
        render={{ slide: LightboxImage }}
      />
    </>
  );
}

function GalleryImage({ photo }: { photo: StaticImageData }) {
  return <Image src={photo} alt="" className="py-2" />;
}

function LightboxImage({
  slide,
  offset,
  rect,
}: RenderSlideProps<Slide>): React.JSX.Element | undefined {
  const galleryImage = gallery.images.find((img) => img.src === slide.src);
  if (!galleryImage) {
    return undefined;
  }

  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  // const width = !cover
  //   ? Math.round(
  //       Math.min(
  //         rect.width,
  //         (rect.height / galleryImage.height) * galleryImage.width,
  //       ),
  //     )
  //   : rect.width;

  // const height = !cover
  //   ? Math.round(
  //       Math.min(
  //         rect.height,
  //         (rect.width / galleryImage.width) * galleryImage.height,
  //       ),
  //     )
  //   : rect.height;

  return (
    <div
      style={{
        position: "relative",
        // width,
        //height
      }}
    >
      <Image
        alt=""
        src={galleryImage}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        // sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
