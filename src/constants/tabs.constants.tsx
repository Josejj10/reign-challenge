export enum ETabOptions {
  ALL,
  FAVORITES,
}

export interface ITabOption {
  value: ETabOptions;
  label: string;
}

export const tabsOptionList: ITabOption[] = [
  {
    label: "All",
    value: ETabOptions.ALL,
  },
  {
    label: "My Faves",
    value: ETabOptions.FAVORITES,
  },
];
