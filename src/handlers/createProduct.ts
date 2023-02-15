import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "src/utils/dynamodb";
import { v4 as uuid } from "uuid";
import { Product } from "../models/product";

export const createProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const product: Product = {
      productId: uuid(),
      name: body.name,
      price: body.price,
      quantity: body.quantity,
    };
    const params = {
      TableName: process.env.PRODUCT_TABLE,
      Item: product,
    };
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
