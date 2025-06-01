import React from "react";
import { Field } from "tinacms"; // 👈 this is what you need

const colorOptions = [
  { label: "Red", value: "bg-red-500" },
  { label: "Blue", value: "bg-blue-500" },
  { label: "Green", value: "bg-green-500" },
  { label: "Gray", value: "bg-gray-100" },
  { label: "White", value: "bg-white" },
];

export const TailwindColorPicker: Field["component"] = ({ input }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colorOptions.map((color) => (
        <button
          key={color.value}
          type="button"
          className={`w-8 h-8 rounded border-2 ${
            input.value === color.value ? "border-black" : "border-transparent"
          } ${color.value}`}
          onClick={() =>
            input.onChange({
              target: { value: color.value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          title={color.label}
        />
      ))}
    </div>
  );
};
