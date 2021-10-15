# NamesLoL (Frontend)
👁️ Find upcoming and recently expired League of Legends summoner names.  
🔎 Search for summoner names to find out if they are available, or when they will become available.  
📒 View from a list of hundreds of thousands of summoner names across five regions to easily find unique and rare summoner names that are up for grabs.

## Official Website
https://nameslol.com/

## Architecture
![architecture](https://i.imgur.com/MnuaMxk.png)

## Tech Stack
- Frontend written in Javascript using the ReactJS library.
- Backend written in Typescript using NodeJS.
- Orchestrated using Serverless Framework
- Data is stored in AWS DynamoDB.
- Frontend is hosted in AWS S3 behind CloudFront.
- Backend is run by Lambda functions behind API Gateway

## Bugs and Feature Requests
All bugs and feature requests should be submitted by opening a Github [issue](https://github.com/bricefrisco/NamesLoL/issues).  
These can be opened to request a new feature, or to report a current feature that is unavailable.

## Installation
Pull down the code, run `npm install` then `npm start`.  
By default, the `.env` file specifies the NamesLoL API. This is okay to do, as the CORS policy is open.  
If you are also running the [backend](https://github.com/bricefrisco/NamesLoL), then modify the `.env` file to point to your API gateway.  
That's it! You can now develop and test locally.

## Deployment
For deployment, first you must create an [AWS account](https://aws.amazon.com/acocunt/sign-up)  
Run `npm install -g serverless`, and `serverless login`.  
Set up [IAM credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#:~:text=Follow%20these%20steps%20to%20create,Framework%2C%20like%20serverless%2Dadmin%20.)
in AWS with admin access, then run `serverless config credentials`. 

To deploy to a development environment, run `serverless deploy`.  
To deploy to production, run `serverless deploy --stage prod`.  
That it! Keep an eye out in the console for the URL to the web app.  
The URL can also be found in the [Serverless App](https://app.serverless.com)


## Disclaimers
NamesLoL is **not** affiliated with Riot Games.  
This service is and will **always** be **free**.  
NamesLoL does **not** own, sell, or trade any summoner names.  
NamesLoL is in accordance with Riot Games ToS.
