import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { cx } from "class-variance-authority";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { css, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
  );

  return {
    props: {
      img,
      css,
      title: config.examples.pages.css.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageCSSSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, css }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 2 })}>
      <li key={img.src} className={imageListItem()}>
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

        <Image {...img} />
      </li>
    </ul>
  </Layout>
);

export default PageCSSSingle;
