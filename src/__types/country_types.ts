import { CurrencyType } from "./currency_type";

export type CountryParamsType = {
  name: string;
}
export type CountryType = {
  name: string;
  shortName: string;
  flagSrc: string;
  currencies: CurrencyType[];
  currencyConversionRate: number;
  population: number;
}