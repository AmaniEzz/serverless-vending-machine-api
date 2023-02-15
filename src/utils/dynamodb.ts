import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as dotenv from "dotenv";
import * as AWS from "aws-sdk";

dotenv.config();
let dynamoDb: DocumentClient;
if (process.env.IS_OFFLINE) {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

export default dynamoDb;
