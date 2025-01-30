const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Books Library API',
      version: '1.0.0',
      description: 'A simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8081',
        description: 'Development server',
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
        DeleteBookResponse: {
            type: "object",
            properties: {
              message: { type: "string", example: "Book deleted successfully" },
            },
          },
        BookStatsResponse: {
            type: "object",
            properties: {
              booksStats: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: { type: "string", description: "User ID" },
                    totalBooks: { type: "integer", description: "Total number of books" },
                    totalRead: { type: "integer", description: "Total books read" },
                    totalUnread: { type: "integer", description: "Total books unread" },
                  },
                },
              },
            },
            example: {
              booksStats: [
                {
                  _id: "6799f9b879a514692ad42c55",
                  totalBooks: 3,
                  totalRead: 1,
                  totalUnread: 2
                }
              ]
            },
        },
        UpdateBook: {
            type: "object",
            required: ["title", "author", "isbn", "read"],
            properties: {
              title: { type: "string", description: "The book title" },
              author: { type: "string", description: "The book author" },
              isbn: { type: "string", description: "The book ISBN" },
              read: { type: "boolean", description: "Whether the book has been read" },
              rating: { type: "number", default: 0, description: "The book rating" },
              notes: { type: "string", default: "", description: "Additional notes about the book" },
            },
            example: {
              title: "The Great Gatsby",
              author: "F. Scott Fitzgerald",
              isbn: "978-3-16-148410-0",
              read: true,
              rating: 5,
              notes: "A classic novel of the Roaring Twenties",
            },
          },
        Book: {
          type: 'object',
         properties:{
            "_id": {
                type: "string",
                description: "The book's id",
                example: "6427d816c602330013506403"
            },
            "title":{
                type: "string",
                description: "The book's title",
                example: "The Murder on the Links"
            },
            "author":{
                type: "string",
                description: "The book's author",
                example: "Agatha Christie"
            },
            "isbn": {
                type: "string",
                description: "The book's ISBN",
                example: "9780061120084"
            },
            "read": {
                type: "boolean",
                description: "Whether the book has been read",
                example: true
            },
            "rating": {
                type: "number",
                description: "The book's rating",
                example: 4
            },
         }
        },
        User:{
            "_id": {
                type: "string",
                description: "The user's id",
                example: "6427d816c602330013506403"
            },
            "fullName":{
                type: "string",
                description: "The user's name",
                example: "John Doe"
            },
            "username":{
                type: "string",
                description: "The user's username",
                example: "john"
            },
            "email": {
                type: "string",
                description: "The user's email",
                example: "john@example.com"
            }
        }
      },
    }
  },
  apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);


module.exports = swaggerSpec;