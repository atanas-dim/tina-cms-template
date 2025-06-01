import React, { useEffect, useState } from "react";
import { Field, SelectProps, SelectField } from "tinacms";
import { client } from "@tina/__generated__/client";

const ThemeSelect: Field["component"] = (props) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    client.queries.themeConnection().then((res) => {
      const options =
        res.data.themeConnection.edges?.map((edge) => ({
          value: edge?.node?._sys.relativePath || "",
          label: edge?.node?.name || "",
        })) || [];

      setOptions(options);
    });
  }, []);

  return <SelectField {...props} options={options} name="active theme" />;
};

export default ThemeSelect;
