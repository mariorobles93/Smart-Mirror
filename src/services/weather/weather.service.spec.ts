import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {CurrentWeather, OWP_Current_Response} from "./weather.interface";

describe('WeatherService', () => {
    let service: WeatherService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpClient]
        });
        service = TestBed.inject(WeatherService);
        httpTestingController = TestBed.inject((HttpTestingController));
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should return weather data for the given coordinates and units', () => {
        const latitude = 42.3601;
        const longitude = -71.0589;
        const units = 'metric';

        const mockWeatherData: OWP_Current_Response = {} as OWP_Current_Response;

        service.getCurrentWeatherData(latitude, longitude, units).subscribe((data) => {
            expect(data).toEqual(mockWeatherData);
        });

        const req = httpTestingController.expectOne((request) => request.url.includes('lat=42.3601&lon=-71.0589&appid='));

        expect(req.request.method).toEqual('GET');

        // Respond with mock data
        req.flush(mockWeatherData);
    });

    it('should return new object for the given data', () => {
        let mockedData: any = {
            weather: [{
                id: 1,
                description: 'description'
            }],
            main: {
                feels_like: 1
            },
            wind: {
                speed: 12,
                deg: 360
            },
            clouds: {
                all: 0
            },
            rain: {
                '1h': 1
            },
            snow: {
                '1h': 0
            }
        };

        let mockedResponse: CurrentWeather = {
            conditionId: 1,
            description: 'description',
            temperature: {
                value: 1,
                units: 'celcius'
            },
            wind: {
                speed: 12,
                beaufortScale: 3,
                direction: 360,
                units: 'kph'
            },
            cloudCoverage: 0,
            precipitation: 1,
            snow: 0
        };

        let response = service.transformResponseToCurrentWeather(mockedData, 'metric');
        expect(response).toEqual(mockedResponse);

        mockedData.wind.speed = 0;
        mockedData.snow = {};
        mockedData.rain = {};

        let mockedData2: any = {
            weather: [{
                id: 1,
                description: 'description'
            }],
            main: {
                feels_like: 1
            },
            wind: {
                speed: 0,
                deg: 360
            },
            clouds: {
                all: 0
            }
        };
        let mockedResponse2: CurrentWeather = {
            conditionId: 1,
            description: 'description',
            temperature: {
                value: 1,
                units: 'fahrenheit'
            },
            wind: {
                speed: 0,
                beaufortScale: 0,
                direction: 360,
                units: 'mph'
            },
            cloudCoverage: 0,
            precipitation: null,
            snow: null
        };

        let response2 = service.transformResponseToCurrentWeather(mockedData2, 'imperial');
        expect(response2).toEqual(mockedResponse2);

    });


});
