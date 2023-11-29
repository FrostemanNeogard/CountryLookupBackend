import { BadRequestException, Injectable } from '@nestjs/common';
import { CountryParamsType, CountryType } from 'src/__types/country_types';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CurrencyType } from 'src/__types/currency_type';
import { FIXER_API_URL, RESTCOUNTRIES_API_URL } from 'src/config';

@Injectable()
export class CountryService {
	constructor(private httpService: HttpService) {}

	async getCountryData(countryName: CountryParamsType) {
		try {
			const countryInfo = await this.fetchCountryAPI(countryName);
			return countryInfo;
		} catch {
			throw new BadRequestException('Invalid country name.', {
				cause: new Error(),
				description: `No country with the name '${countryName}' was found.`,
			});
		}
	}

	private async fetchCountryAPI(countryName: CountryParamsType) {
		const API_URL = new URL(RESTCOUNTRIES_API_URL);
		API_URL.pathname += `name/${countryName}`;
		const response = await firstValueFrom(this.httpService.get(API_URL.href));
		const country = response.data[0];
		const { name, cioc, population, flags } = country;
		const currencies: CurrencyType[] = await this.getCurrencyData(country);
		const countryData: CountryType = {
			name: name?.common,
			shortName: cioc ?? undefined,
			currencies: currencies,
			flagSrc: flags?.png,
			currencyConversionRate: 1,
			population: population || undefined,
		};
		return {
			statusCode: 200,
			countryData,
		};
	}

	private async getCurrencyData(country) {
		const API_URL = new URL(
			`${FIXER_API_URL}latest?access_key=${process.env.FIXER_API_KEY}`,
		);
		const response = await firstValueFrom(this.httpService.get(API_URL.href));
		const { rates } = response.data;
		const sekConversionRate = rates['SEK'];
		const countryCurrencies = Object.keys(country?.currencies);
		const currenciesData: CurrencyType[] = countryCurrencies.map((currency) => {
			return {
				name: currency,
				conversionRate: rates[currency] / sekConversionRate,
			};
		});

		return currenciesData;
	}
}
