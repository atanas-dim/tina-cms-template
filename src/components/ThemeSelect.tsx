import React, { useEffect, useState } from "react";
import { useCMS, Field } from "tinacms";
import { client } from "@tina/__generated__/client";

type Option = {
  relativePath: string;
  name: string;
};

const ThemeSelect: Field["component"] = (props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const cms = useCMS();

  useEffect(() => {
    console.log({ props, cms, client });

    client.queries.themeConnection().then((res) => {
      const options =
        res.data.themeConnection.edges?.map((edge) => ({
          relativePath: edge?.node?._sys.relativePath || "",
          name: edge?.node?.name || "",
        })) || [];

      setOptions(options);
    });
  }, []);

  const handleChange = () => {
    props.input.onChange();
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span>Active Theme</span>
      <select className="border p-2" {...props.input}>
        {options.map((opt) => {
          return (
            <option key={opt.relativePath} value={opt.relativePath}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ThemeSelect;
