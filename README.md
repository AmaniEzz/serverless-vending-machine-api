# Serverless Vending Machine API - AWS Node.js Typescript

This is a Serverless API that allows users to interact with a vending machine system. Users can read, create, delete, and purchase products from the vending machine using RESTful API endpoints. The project is built using Node.js, TypeScript, and the Serverless Framework, and is deployed on AWS.

This project aims at demonstrating how to use Serverless Framework and AWS API Gateway to create a REST API through which you can invoke a Lambda function using an HTTP request to endpoints that will perform create, read, update, and delete (CRUD) operations on a DynamoDB table. 

## Technologies Used

- Node.js
- TypeScript
- Serverless Framework
- AWS API Gateway
- AWS Lambda
- DynamoDB

## Installation/deployment instructions

## Installation

You will need the following packages installed locally,

- AWS CLI
- NodeJS (14.18.0 or higher)
- NPM

## Local Development

First, run the following commands in the same order

```bash
npm install -g serverless
npm install
npm run dynamodb:install
```

To start lambda functions and DynamoDB locally in the offline mode use the following command:

`npm run sls:offline`

To deploy the lambda functions to AWS run the following command:

`npm run deploy`

To remove all resources created on AWS run the following command:

`npm run remove`

## Test in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/12743195-c5a465cf-fe98-4a35-b733-acbfe3d4f5db?action=collection%2Ffork&collection-url=entityId%3D12743195-c5a465cf-fe98-4a35-b733-acbfe3d4f5db%26entityType%3Dcollection%26workspaceId%3D4f515dc9-038a-44f7-a0f9-72e789044fdb)

## Contributing

If you would like to contribute to the project, please open a pull request with your changes.
