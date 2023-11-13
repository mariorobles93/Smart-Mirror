import {Component} from '@angular/core';
import {WeatherService} from "../services/weather/weather.service";
import {Observable} from "rxjs";
import {CurrentWeather, OWP_Current_Response} from "../services/weather/weather.interface";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private weatherService: WeatherService) {
        let latitude: number = 30.455606825395346;
        let longitude: number = -97.62185742499143;
        const units = 'imperial';
        let currentWeather: CurrentWeather;

        let response: Observable<OWP_Current_Response> = this.weatherService.getCurrentWeatherData(latitude, longitude, units);
        response.subscribe((response) => {
            currentWeather = this.weatherService.transformResponseToCurrentWeather(response, units);
            console.log(currentWeather);
        })
    }
}
