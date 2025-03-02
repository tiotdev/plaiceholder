import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { getAllUnsplashImagePaths } from "@/lib/images";
import { cx } from "class-variance-authority";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { css, img } = await getPlaiceholder(src, { size: 4 });

      return {
        ...img,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        css,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      title: config.examples.pages.css.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageCSSMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ css, ...image }) => (
        <li key={image.src} className={imageListItem()}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
            style={css}
          />

          <Image {...image} />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageCSSMultiple;
