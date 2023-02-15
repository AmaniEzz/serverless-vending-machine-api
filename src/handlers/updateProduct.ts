import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "src/utils/dynamodb";

export const updateProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    const body = JSON.parse(event.body);
    const params = {
      TableName: process.env.PRODUCT_TABLE,
      Key: { productId },
      UpdateExpression:
        "set #name = :name, #price = :price, #quantity = :quantity",
      ExpressionAttributeNames: {
        "#name": "name",
        "#price": "price",
        "#quantity": "quantity",
      },
      ExpressionAttributeValues: {
        ":name": body.name,
        ":price": body.price,
        ":quantity": body.quantity,
      },
      ReturnValues: "ALL_NEW",
    };
    const result = await dynamoDb.update(params).promise();
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
