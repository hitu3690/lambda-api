import ApiClient from "./client";
import OpenWeatherApi from "./openWeather";

interface ApiService {
  openWeather: OpenWeatherApi;
}

/** 外部API一覧 */
class Api extends ApiClient implements ApiService {
  get openWeather(): OpenWeatherApi {
    return new OpenWeatherApi();
  }
}

export default new Api();
