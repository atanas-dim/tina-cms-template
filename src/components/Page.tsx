"use client";
import { type FC } from "react";

import { PageQuery, PageQueryVariables } from "@tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type PageProps = {
  query: string;
  variables: PageQueryVariables;
  data: PageQuery;
};

const Page: FC<PageProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  return (
    <article className="prose max-w-3xl mx-auto py-10">
      <h1 data-tina-field={tinaField(page, "title")}>{page.title}</h1>
      <div data-tina-field={tinaField(page, "body")}>
        <TinaMarkdown content={page.body} />
      </div>
    </article>
  );
};

export default Page;
