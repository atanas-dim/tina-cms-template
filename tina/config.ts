import { defineConfig } from "tinacms";
import ThemeSelect from "@/components/ThemeSelect";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public/media",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "settings",
        label: "Settings",
        path: "content/settings",
        format: "json",
        fields: [
          {
            type: "string",
            name: "activeTheme",
            label: "Active Theme",
            ui: {
              component: ThemeSelect,
            },
          },
        ],
      },
      {
        name: "theme",
        label: "Themes",
        path: "content/themes",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Theme Name",
            required: true,
          },
          {
            type: "object",
            name: "button",
            label: "Button",
            fields: [
              {
                type: "string",
                name: "bgColor",
                label: "Background Color",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                name: "textColor",
                label: "Text Color",
                ui: {
                  component: "color",
                },
              },
            ],
          },
        ],
      },

      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",

        ui: {
          router: ({ document }) => {
            return document._sys.filename === "index.json"
              ? "/"
              : document._sys.relativePath;
          },
          allowedActions: {
            delete: true,
            create: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
