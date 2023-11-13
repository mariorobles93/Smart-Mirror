export interface CurrentWeather {
    conditionId: number,
    description: string,
    temperature: {
        value: number,
        units: 'fahrenheit' | 'celcius'
    },
    wind: {
        speed: number
        beaufortScale: number, // 0-12
        direction: number, // 0-360
        units: 'mph' | 'kph'
    },
    cloudCoverage: number,
    precipitation: number | null, //unit is always mm
    snow: number | null //unit is always mm
}

export interface OWP_Current_Response {
    coord: {
        lon: number
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    rain: {
        '1h': number
    } | null,
    snow: {
        '1h': number
    } | null,
    clouds: {
        all: number
    },
    dt: number, // UNIX UTC
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number, // UNIX UTC
        sunset: number// UNIX UTC
    },
    timezone: number, // Shift in seconds from UTC
    id: number, //city id
    name: string,
    cod: number
}
