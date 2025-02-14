import React from "react";
import CustomDropdown from "./CustomDropdown";

interface AgeDropdownProps {
  value: number | null;
  onChange: (value: number) => void;
}

const AgeDropdown: React.FC<AgeDropdownProps> = ({ value, onChange }) => {
  const ageOptions = [
    { label: "17 years of age or less", value: 17 },
    ...Array.from({ length: 28 }, (_, i) => ({
      label: `${i + 18} years of age`,
      value: i + 18,
    })),
    { label: "45 years of age or more", value: 45 },
  ];

  return (
    <CustomDropdown<{ label: string; value: number }>
      value={ageOptions.find((option) => option.value === value) || null}
      options={ageOptions}
      onChange={(selected) => onChange(selected.value)}
      mode={{ display: "label", value: "value" }}
      placeholder="Select your age"
    />
  );
};

export default AgeDropdown;

