import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { config } from "@/config";
import { cx } from "class-variance-authority";
import { getAllUnsplashImagePaths } from "@/lib/images";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { blurhash, img } = await getPlaiceholder(src);

      return {
        ...img,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        blurhash,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageBlurhashMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ blurhash, ...image }) => (
        <li key={image.src} className={imageListItem()}>
          <BlurhashCanvas
            hash={blurhash.hash}
            width={blurhash.height}
            height={blurhash.width}
            punch={1}
            className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
          />

          <Image {...image} />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageBlurhashMultiple;
