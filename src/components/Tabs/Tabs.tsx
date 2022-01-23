import { ETabOptions, ITabOption } from "../../constants/tabs.constants";
import "./Tabs.css";

export interface ITabsProps {
  list: ITabOption[];
  selectedValue: ETabOptions;
  onChange: (value: ETabOptions) => void;
}

const Tabs = ({ list, onChange, selectedValue }: ITabsProps) => {
  const onSelectTab = (option: ETabOptions) => {
    onChange(option);
  };

  return (
    <ul className="Tabs">
      {list &&
        list.map((option: ITabOption) => (
          <li
            className={`Tabs__option ${
              selectedValue === option.value ? "Tabs__option-selected" : ""
            }`}
            key={option.value}
            onClick={() => onSelectTab(option.value)}
          >
            {option.label}
          </li>
        ))}
    </ul>
  );
};

export default Tabs;
