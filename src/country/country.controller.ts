import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryParamsType } from 'src/__types/country_types';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get(':name')
  getCountryData(@Param('name') name: CountryParamsType) {
    const data = this.countryService.getCountryData(name);
    return data;
  }
}
