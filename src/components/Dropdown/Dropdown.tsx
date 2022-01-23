import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import ChevronDownSvg from "../../assets/chevron-down.svg?component";
// @ts-ignore
import ChevronUpSvg from "../../assets/chevron-up.svg?component";
import { IDropdownOption } from "../../constants/dropdown.constants";
import "./Dropdown.css";

export interface IDropdownProps {
  list: IDropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ list, onChange, selectedValue }: IDropdownProps) => {
  const outsideRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen((current) => !current);
  };

  const onSelectOption = (value: string) => {
    onChange(value);
    toggleList();
  };

  // On click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Order of the expression arranged to take advantage
      // of js's short circuiting operators
      if (
        outsideRef.current &&
        isOpen &&
        !outsideRef.current.contains(event.target)
      ) {
        toggleList();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, outsideRef]);

  // Memoization to find option using currentValue
  const selectedOption = useMemo(() => {
    const option = list.find(
      (option: IDropdownOption) => option.value === selectedValue
    );
    if (option) return option;
    // If no option with the current value found in list
    return {
      value: "",
      label: "Select an option",
      icon: "",
    };
  }, [list, selectedValue]);

  return (
    <div className="Dropdown" ref={outsideRef}>
      <div className="Dropdown__header" onClick={toggleList}>
        <div className="Dropdown__value">
          <img src={selectedOption.icon} />
          <span>{selectedOption.label}</span>
        </div>
        {isOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
      </div>
      {isOpen && (
        <div className="Dropdown__list-container">
          <ul className="Dropdown__list">
            {list &&
              list.map((option: IDropdownOption) => (
                <li
                  className="Dropdown__option"
                  onClick={() => onSelectOption(option.value)}
                  key={option.value}
                >
                  <img src={option.icon} />
                  <span>{option.label}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
