const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "ap-south-1",
      BUCKET: "notes-app-uploads-mt1",
    },
    apiGateway: {
      REGION: "ap-south-1",
      URL: "https://jxleojxvgb.execute-api.ap-south-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_42s1Jqzt8",
      APP_CLIENT_ID: "691qoct6bbkki7bahu65e4hn84",
      IDENTITY_POOL_ID: "ap-south-1:389c7b41-1639-4550-a00b-9fa743c01a44",
    },
  };
  
  export default config;
  