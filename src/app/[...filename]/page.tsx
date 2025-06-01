import { notFound, redirect } from "next/navigation";
import { client } from "@tina/__generated__/client";
import Page from "@/components/Page";

export default async function BlogPostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  const { filename } = await params;

  const filePath = filename.join("/");

  if (filePath === "index") redirect("/");

  const shouldAddExtension = !filePath.includes(".json");
  const relativePath = shouldAddExtension ? filePath + ".json" : filePath;

  try {
    const { data, variables, query } = await client.queries.page({
      relativePath: relativePath,
    });

    return <Page data={data} variables={variables} query={query} />;
  } catch (err) {
    console.error("Tina fetch error:", err);
    notFound(); // fallback to 404
  }
}
