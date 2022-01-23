import AngularImage from "../assets/angular.png";
import ReactImage from "../assets/react.png";
import VueImage from "../assets/vue.png";

export interface IDropdownOption {
  value: string;
  label: string;
  icon: string;
}

// Declared outside because it isn't modified in the component
// Didn't use enum here because present needs don't require the
// comparison of the value to set a state
// (e.g. with tabs you need to compare active tabs with current value to know what to show)
export const dropdownOptionList: IDropdownOption[] = [
  {
    icon: AngularImage,
    label: "Angular",
    value: "angular",
  },
  {
    icon: ReactImage,
    label: "Reactjs",
    value: "reactjs",
  },
  {
    icon: VueImage,
    label: "Vuejs",
    value: "vuejs",
  },
];
