import React, { useState, useEffect } from "react";
import { WcsFormField, WcsLabel, WcsSelect, WcsSelectOption } from "wcs-react";

interface SelectFilterProps {
  onSelectChange: (selectedValue: string) => void;
  selectedValue: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  onSelectChange,
  selectedValue,
}) => {
  const [value, setValue] = useState<string>(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const onFilter = (e: CustomEvent) => {
    const target = e.target as HTMLWcsSelectElement;
    const selectedValue = target.value;
    setValue(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <div>
      <WcsFormField>
        <WcsLabel>Voir vos tâches :</WcsLabel>
        <WcsSelect
          id="theselect"
          value={value}
          size="m"
          name="The select"
          onWcsChange={(e) => onFilter(e as CustomEvent)}
        >
          <WcsSelectOption value="1">
            Toutes
          </WcsSelectOption>
          <WcsSelectOption
            value="2"
          >
            En attente
          </WcsSelectOption>
          <WcsSelectOption value="3">
            Terminées
          </WcsSelectOption>
        </WcsSelect>
      </WcsFormField>
    </div>
  );
};

export default SelectFilter;
