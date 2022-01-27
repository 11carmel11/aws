const cdk = require("aws-cdk-lib");
const DynamoDB = require("aws-cdk-lib/aws-dynamodb");
const Lambda = require("aws-cdk-lib/aws-lambda");
const ApiGateWay = require("aws-cdk-lib/aws-apigateway");
const S3 = require("aws-cdk-lib/aws-s3");
const Triggers = require("aws-cdk-lib/aws-lambda-event-sources");

class ProjectTestStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const table = new DynamoDB.Table(this, "ids-table", {
      partitionKey: { name: "vehicleId", type: DynamoDB.AttributeType.STRING },
    });

    //#region lambda
    const lambdaFunction_porter = new Lambda.Function(this, "porter", {
      runtime: Lambda.Runtime.NODEJS_14_X,
      code: Lambda.Code.fromAsset("lambda-functions"),
      handler: "handler.porter",
    });

    const lambdaFunction_ingest = new Lambda.Function(this, "ingest", {
      runtime: Lambda.Runtime.NODEJS_14_X,
      code: Lambda.Code.fromAsset("lambda-functions"),
      handler: "handler.ingest",
    });

    const lambdaFunction_analyzer = new Lambda.Function(this, "analyzer", {
      runtime: Lambda.Runtime.NODEJS_14_X,
      code: Lambda.Code.fromAsset("lambda-functions"),
      handler: "handler.analyzer",
    });
    //#endregion

    const api = new ApiGateWay.RestApi(this, "idsGateWay", {
      deployOptions: { stageName: "api" },
    });

    const bucket = new S3.Bucket(this, "reports-carmel", {
      bucketName: "reports-carmel",
    });

    //#region bucket Roles granting
    bucket.grantWrite(lambdaFunction_porter);
    bucket.grantRead(lambdaFunction_ingest);
    //#endregion

    //#region table Roles granting
    table.grantWriteData(lambdaFunction_ingest);
    table.grantReadData(lambdaFunction_analyzer);
    //#endregion

    //#region api Endpoints
    api.root.addMethod(
      "POST",
      new ApiGateWay.LambdaIntegration(lambdaFunction_porter)
    );

    api.root
      .addResource("{stat}")
      .addMethod(
        "GET",
        new ApiGateWay.LambdaIntegration(lambdaFunction_analyzer)
      );
    //#endregion

    //#region lambda_ingest Trigger added
    lambdaFunction_ingest.addEventSource(
      new Triggers.S3EventSource(bucket, {
        events: [S3.EventType.OBJECT_CREATED],
      })
    );
    //#endregion

    // logs the api url on deploy
    new cdk.CfnOutput(this, "MY URL", { value: api.url || "NO URL!!!!" });
  }
}

module.exports = { ProjectTestStack };
