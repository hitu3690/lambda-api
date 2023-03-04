import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import api from "../../api";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const res = await api.openWeather.getCurrentWeather();
  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello from TypeScript Lambda!",
        input: event,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
}
