// components/Button.tsx
import React, { useEffect, useState } from "react";
import { client } from "@tina/__generated__/client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  // TODO This should be global theme data for the app and should be Tailwind classes
  const [styles, setStyles] = useState({ bgColor: "#000", textColor: "#fff" });

  useEffect(() => {
    client.queries.settingsConnection().then((res) => {
      const relativePath =
        res?.data?.settingsConnection?.edges?.[0]?.node?.activeTheme;

      console.log({ relativePath });
      if (!relativePath) return;
      client.queries.theme({ relativePath }).then((res) => {
        console.log({ res });
        const { bgColor = undefined, textColor = undefined } =
          res.data.theme.button || {};

        console.log({ bgColor, textColor });
        setStyles((prev) => ({
          ...prev,
          ...(bgColor && { bgColor }),
          ...(textColor && { textColor }),
        }));
      });
    });
  }, []);

  return (
    <button
      style={{
        backgroundColor: styles.bgColor,
        color: styles.textColor,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
