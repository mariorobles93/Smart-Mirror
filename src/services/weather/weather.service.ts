import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CurrentWeather, OWP_Current_Response} from "./weather.interface";
import {API_KEY} from "../api-key";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private API_URL: string = "https://api.openweathermap.org/data/2.5/weather?";
    private API_KEY: string = API_KEY;

    constructor(private http: HttpClient) {
    }

    /**
     * @description Gets current weather data from OpenWeatherMap API
     * @returns {Observable<OWP_Current_Response>}
     * @param latitude
     * @param longitude
     * @param units
     */
    public getCurrentWeatherData(latitude: number, longitude: number, units: 'metric' | 'imperial'): Observable<OWP_Current_Response> {
        let fullUrl: string = `${this.API_URL}lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=${units}`;

        return this.http.get<OWP_Current_Response>(fullUrl);
    }

    public transformResponseToCurrentWeather(data: any, units: 'metric' | 'imperial'): CurrentWeather {
        let beaufortScale: number = 0;
        let scaleStepsMPH: number [] = [1, 3, 7, 12, 18, 24, 31, 38, 46, 54, 63, 72];
        let scaleStepsKPH: number[] = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];
        let scaleSteps: number[] = units === 'metric' ? scaleStepsKPH : scaleStepsMPH;

        for (let i = 0; i <= scaleSteps.length; i++) {
            if (data.wind.speed < 1) {
                beaufortScale = 0;
                break;
            }
            if (scaleSteps[i - 1] <= data.wind.speed && data.wind.speed < scaleSteps[i]) {
                beaufortScale = i;
            }
        }


        return {
            conditionId: data.weather[0].id,
            description: data.weather[0].description,
            temperature: {
                value: data.main.feels_like,
                units: units === 'metric' ? 'celcius' : 'fahrenheit'
            },
            wind: {
                speed: data.wind.speed,
                beaufortScale: beaufortScale,
                direction: data.wind.deg,
                units: units === 'metric' ? 'kph' : 'mph'
            },
            cloudCoverage: data.clouds.all,
            precipitation: data.rain ? data.rain['1h'] : null,
            snow: data.snow ? data.snow['1h'] : null,
        };
    }
}
