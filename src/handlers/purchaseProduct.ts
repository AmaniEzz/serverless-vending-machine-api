import { APIGatewayProxyHandler } from "aws-lambda";
import { Purchase } from "src/models/purchase";
import dynamoDb from "src/utils/dynamodb";
import { v4 as uuid } from "uuid";

export const purchaseProduct: APIGatewayProxyHandler = async (event) => {
  const productId = event.pathParameters.productId;
  const quantity = parseInt(event.queryStringParameters?.quantity ?? "1", 10);

  // 1) update the purchased product's quantity
  const result = await dynamoDb
    .update({
      TableName: process.env.PRODUCT_TABLE,
      Key: { productId: productId },
      UpdateExpression: "SET #quantity = #quantity - :quantity",
      ConditionExpression: "#quantity >= :quantity",
      ExpressionAttributeNames: { "#quantity": "quantity" },
      ExpressionAttributeValues: { ":quantity": quantity },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  const updatedProduct = result.Attributes;

  // 2) Save a new purchase record in the database
  const purchase: Purchase = {
    id: uuid(),
    productId: productId,
    timestamp: new Date().toISOString(),
    price: result.Attributes.price,
  };
  const params = {
    TableName: process.env.PURCHASE_TABLE,
    Item: purchase,
  };
  await dynamoDb.put(params).promise();

  // return 200 and {Product:..., Purchase:...} in the body
  return {
    statusCode: 200,
    body: JSON.stringify({ Product: updatedProduct, Purchase: purchase }),
  };
};
