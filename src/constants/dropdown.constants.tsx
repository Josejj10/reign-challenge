import AngularImage from "../assets/angular.png";
import ReactImage from "../assets/react.png";
import VueImage from "../assets/vue.png";

export enum EDropdownOptions {
  ANGULAR = "angular",
  REACT = "reactjs",
  VUE = "vuejs",
}

export interface IDropdownOption {
  value: EDropdownOptions;
  label: string;
  icon: string;
}

// Declared outside because it isn't modified in the component
export const dropdownOptionList: IDropdownOption[] = [
  {
    icon: AngularImage,
    label: "Angular",
    value: EDropdownOptions.ANGULAR,
  },
  {
    icon: ReactImage,
    label: "Reactjs",
    value: EDropdownOptions.REACT,
  },
  {
    icon: VueImage,
    label: "Vuejs",
    value: EDropdownOptions.VUE,
  },
];
