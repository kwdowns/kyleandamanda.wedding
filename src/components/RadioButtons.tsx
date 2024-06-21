import { useState, useEffect, useId } from "react";

export interface RadioButtonsProps {
  groupName: string;
  selectedValue: string;
  options: {
    value: string;
    label: string | null;
  }[];
}

export default function RadioButtons({
  selectedValue,
  options,
  groupName,
}: RadioButtonsProps) {
  const [selected, setSelected] = useState(selectedValue);
  useEffect(() => {
    return () => {};
  }, [selected]);
  return (
    <>
      {options.map((option) => {
        const isChecked = selected === option.value;
        <RadioButtonOption
          key={option.value}
          value={option.value}
          label={option.label ?? option.value}
          groupName={groupName}
          checked={isChecked}
        />;
      })}
    </>
  );
}

interface RadioButtonOptionProps {
  value: string;
  label: string;
  groupName: string;
  checked: boolean;
}

function RadioButtonOption({
  value,
  label,
  groupName,
  checked,
}: RadioButtonOptionProps) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} key={`radio-label-${value}`}>
        {label}
      </label>
      <input
        type="radio"
        id={id}
        key={value}
        value={value}
        checked={checked}
        radioGroup={groupName}
      />
    </>
  );
}
