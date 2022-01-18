# AWS - Lambda

<img alt="lambda image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Orange_lambda.svg/980px-Orange_lambda.svg.png" height="100px" width="100px"/> <img alt="aws image" src="https://xpert-careers.com/wp-content/uploads/2021/02/aws1.png" height="100px" width="150px"/>

---

## Topics -

#### Lambda | IAM - Roles and Policies | CloudWatch | S3 | AWS-SDK

---

## Services

### What is Lambda ?

- **Function as a service**
- **Serverless function**
- **Triggers and Destination**
  - **Trigger- Actions that invoke the lambda function**
  - **Destination- Outsourcing the function output to chosen service (SNS, SQS, LAMBDA, EVENT BRIDGE)**

### IAM - Roles and Policies 👥

- **Policy - Allow access/permissions to different services**
- **Role - one or number of policies**
- **Policies should be as specific as possible to prevent unwanted charges/damage**

### CloudWatch 📃

- **CloudWatch provides you with data and actionable insights to monitor your applications**
- **Lambda functions logs as default to CloudWatch, notice the recommended policy when creating lambda function**

### AWS-SDK package -

- **SDK - Software Developer Kit- Package which lets you code natively using all AWS services (See resources)**
- **Comes pre-built inside the lambda service**
- **All usage should be in Promises**

---

## How it all connects:

- **[Getting started](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/begin)**
  - **Lambda scalability**
- **Create function:**
  - **Choose a unique (between your lambdas) function name**
  - **Runtime**
  - **Permissions - By default gives you access to CloudWatch logs. But you can create your own role with your own policies**
- **Write and test the lambdas :**

  - **Deploy function to save the changes**
  - **New test ➡ name ➡ write the event to send in the writing area ➡ press test button**
  - **See the logs on cloudWatch and in the extra tab in the lambda function**
  - **Testing errors**

- **[AWS-SDK](https://www.npmjs.com/package/aws-sdk) - Build in the lambda.**

---

## Resources:

### General:

- **[Who's Using Amazon Web Services? [2020 Update]](https://www.contino.io/insights/whos-using-aws)**

### Lambda:

- **[Introduction to AWS Lambda - Serverless Compute on Amazon Web Services](https://www.youtube.com/watch?v=eOBq__h4OJ4)**
- **[AWS Lambda Introduction](https://www.youtube.com/watch?v=d6lrokAELO0&list=PLt1SIbA8guuvQqlwrYjCjf1I_RL5qwrYt)**
- **[AWS Lambda Tutorial](https://www.youtube.com/watch?v=seaBeltaKhw)**

### IAM - Roles and Policies:

- **[AWS IAM Tutorial - How to Create a User and Policy](https://www.youtube.com/watch?v=dMPDZHVIZBs)**
- **[STOP Using ROOT Accounts, START Using USER Accounts! Step by Step AWS Tutorial](https://www.youtube.com/watch?v=NcJ001_Ombk)**

### CloudWatch:

- **[AWS Cloudwatch Service Overview | Console Walkthrough](https://www.youtube.com/watch?v=k7wuIrHU4UY)**
- **[How to monitor and log AWS Lambda function with CloudWatch](https://www.youtube.com/watch?v=1bQ5rOV1z-k)**
- **Bonus - [AWS Cloudwatch Alarm Setup Tutorial | Step by Step](https://www.youtube.com/watch?v=lHWrAAzoxJA)**

### AWS-SDK :

- **[AWS-SDK NPM](https://www.npmjs.com/package/aws-sdk)**
- **[NodeJS-sdk](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)**

---

## Task -

### 🔸 Create lambda I - Write to S3 bucket

- **Create a new lambda called `writer`.**
- **Create a new S3 bucket called `users`.**
- **Implement `writer` lambda to receive events and save the received users into the `users` bucket:**
  - **Save every user in their own file.**
  - **The name of the file will be `user<userId>.json`.**
- **Write a test for the `writer` lambda and send the users.json from the assets file. Make sure the information is indeed kept in the bucket as the requirements.**

**Event template for the test**

```
{
    "users": <users array>
}
```

### 🔸 Create lambda II - Read from S3 bucket

- **Create a new lambda called `reader`.**
- **Implement `reader` lambda to read files from the S3 bucket.**
- **The lambda receive event and logs the entire info from the bucket- Expected output to be like users.json**
- **Write a test and give the following event template - replace the bucket name and key as your own**

**Event template for the test**

```
{
    "s3" {
        "bucket": {
            "name": <bucket name>, "key": <bucket key>
        }
    }
}
```

### 🔸 Make lambdas more cost effective

**Now think we would get a much larger number of users, say a million. We would not want to keep them one by one.**

- **Rewrite the lambda `writer` so you can receive either a single object or an array. Each request will be saved as a single file. Give your own unique name to the file.**
- **Make the appropriate changes to the `reader` lambda.**

### 🔸 Bonus I - Trigger from S3 bucket to lambda II

- **Add trigger so each time a new item is added to the `users` bucket, the `reader` lambda invokes.**
- **Create a new S3 bucket called `users-total`.**
- **Modify the `reader` lambda to write the total number of users into your new bucket- In the same file.**

#### If you get stuck

- **[Upload to S3 From Lambda Tutorial | Step by Step Guide](https://www.youtube.com/watch?v=vXiZO1c5Sk0)**
- **[AWS Lambda upload to s3 using Node JS (2020)](https://www.youtube.com/watch?v=Wnbw15Oue1k&t=177s)**

### 🔸 Bonus II - Use your IDE to create function

- **Update the `writer` lambda to use nanoId package and change the users id before saving them to the bucket- All while using the AWS-CLI.**
  - **Read about - [update-function-code](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html)**
- **For advanced! Use layers instead of node modules.**
  - **[AWS Lambda Layers with Node JS (2020)](https://www.youtube.com/watch?v=-r4GJlkdJo0&ab_channel=WornOffKeys)**

### 🔸 Bonus III - Saving S3 data to [DynamoDB](https://www.youtube.com/watch?v=2mVR_Qgx_RU)

- **Create a new DynamoDB table called `users`, with primary key as userId**
- **Update the `reader` lambda function to have the capability to save S3 json files to `users` table**
- **Create new lambda function called `exactPhonesDDB`**
- **This function should return the number of users with the same phone number. expected output should be number**

#### If you get stuck

- **[AWS Lambda + DynamoDB Example Tutorial (2018)](https://www.youtube.com/watch?v=usgK4KsdNWM)**

## Good luck 💪
