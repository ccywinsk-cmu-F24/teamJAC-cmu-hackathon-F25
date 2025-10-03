import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "InvestEd API",
      version: "1.0.0",
      description: "Financial literacy platform API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            email: {
              type: "string",
              format: "email",
            },
            name: {
              type: "string",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
            },
            password: {
              type: "string",
              minLength: 1,
              description: "User's password (minimum 1 character for login)",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
            userId: {
              type: "string",
              format: "uuid",
            },
            email: {
              type: "string",
              format: "email",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
            },
            password: {
              type: "string",
              minLength: 8,
              pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
              description: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number",
            },
            name: {
              type: "string",
              description: "User's name (optional)",
            },
          },
        },
        RegisterResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            email: {
              type: "string",
              format: "email",
            },
            name: {
              type: "string",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        SurveyAnswer: {
          type: "object",
          required: ["questionId", "answer"],
          properties: {
            questionId: {
              type: "string",
              minLength: 1,
              description: "Unique identifier for the survey question",
            },
            answer: {
              oneOf: [
                {
                  type: "string",
                  minLength: 1,
                },
                {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  minItems: 1,
                },
              ],
              description: "Answer can be a single string or an array of strings",
            },
          },
        },
        UpdateSurveyRequest: {
          type: "object",
          required: ["answers"],
          properties: {
            answers: {
              type: "array",
              items: {
                $ref: "#/components/schemas/SurveyAnswer",
              },
              minItems: 1,
              description: "Array of survey answers",
            },
          },
        },
        SurveyResponse: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "uuid",
            },
            answers: {
              type: "array",
              items: {
                $ref: "#/components/schemas/SurveyAnswer",
              },
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
