import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "src/utils/dynamodb";

export const deleteProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    const params = {
      TableName: process.env.PRODUCT_TABLE,
      Key: { productId },
      ReturnValues: "ALL_OLD",
    };
    const result = await dynamoDb.delete(params).promise();
    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
