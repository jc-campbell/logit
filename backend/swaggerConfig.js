import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Logit API Documentation',
      version: '0.0.1',
      description: 'API documentation for the logit backend system',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;