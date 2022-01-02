const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Music API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development server",
      },
    ],
  },

  apis: ["./lib/routes/index.js", "./lib/controllers/*.js"],
};

module.exports = swaggerJsdoc(options);
