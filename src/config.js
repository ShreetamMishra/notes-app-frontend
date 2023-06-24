const dev = {
  s3: {
      REGION: "ap-south-1",
      BUCKET: "dev-notes-infra-s3-uploads4f6eb0fd-k3qq3ch66wa4",
  },
  apiGateway: {
      REGION: "ap-south-1",
      URL: "https://pjp2kap1n8.execute-api.ap-south-1.amazonaws.com/dev",
  },
  cognito: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_YoVAFDaJr",
      APP_CLIENT_ID: "58jum49uluba6lb7l0m9gus95b",
      IDENTITY_POOL_ID: "ap-south-1:e7d1571d-e73a-42ee-a71c-0eae725c3164",
  },
};

const prod = {
  s3: {
      REGION: "ap-south-1",
      BUCKET: "prod-notes-infra-s3-uploads4f6eb0fd-e2zkujvqq1sp",
  },
  apiGateway: {
      REGION: "ap-south-1",
      URL: "https://jxleojxvgb.execute-api.ap-south-1.amazonaws.com/prod",
  },
  cognito: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_5QImoyvsq",
      APP_CLIENT_ID: "16jriehc5c1tl3fvd0qp2p8pjr",
      IDENTITY_POOL_ID: "ap-south-1:97bdc856-9f43-468b-a243-cede6c5dceb0",
  },
};

const config = {
  MAX_ATTACHMENT_SIZE: 5000000,

  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
