import ApiClient from "../api/client";

const CURRENT_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=NARITA&appid=a385722703c642aa8aac67b9146456d9";

export default class OpenWeatherApi extends ApiClient {
  async getCurrentWeather(): Promise<any> {
    const data = await this.get(CURRENT_WEATHER_API_URL);
    return data;
  }
}
