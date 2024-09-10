import React, { FC } from "react";

type Props = {
  title: string;
  keywords?: string;
  description?: string;
};

const Heading: FC<Props> = ({ title, keywords, description }) => {
  return (
    <>
      <title>{title ? title : "FiftyOne - FiftyOne.eg"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content={
          description
            ? description
            : "Uncover curated style at Limited. Explore unique fashion, accessories, and lifestyle essentials. Shop limited edition pieces now."
        }
      />
    </>
  );
};

export default Heading;
