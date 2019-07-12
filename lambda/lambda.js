import awsServerlessExpress from "aws-serverless-express";
import app from "./server/app";

const server = awsServerlessExpress.createServer(app);

exports.handlers = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
