import { notFound } from "next/navigation";
import { client } from "@tina/__generated__/client";
import Page from "@/components/Page";

export default async function BlogPostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  const parameters = await params;

  const relativePath = parameters.filename.join("/") + ".json";

  try {
    const { data, variables, query } = await client.queries.page({
      relativePath,
    });

    console.log({ data, variables, query });

    return <Page data={data} variables={variables} query={query} />;
  } catch (err) {
    console.error("Tina fetch error:", err);
    notFound(); // fallback to 404
  }
}
