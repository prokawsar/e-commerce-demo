import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ImageProp = {
  src: string;
  alt: string;
  styles?: string;
};

export default function Image({ src, alt, styles }: ImageProp) {
  return (
    <>
      <LazyLoadImage
        alt={alt}
        className={`bg-gray-50 z-0 rounded-lg w-full h-64 object-cover object-center hover:scale-105 ${styles}`}
        effect="blur"
        src={src}
      />
    </>
  );
}
