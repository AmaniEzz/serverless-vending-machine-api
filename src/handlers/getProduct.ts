import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "src/utils/dynamodb";

export const getProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    const params = {
      TableName: process.env.PRODUCT_TABLE,
      Key: { productId },
    };
    const result = await dynamoDb.get(params).promise();
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
