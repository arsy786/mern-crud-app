# MERN CRUD APP TUTORIAL

## Table of Contents
- [MERN CRUD APP TUTORIAL](#mern-crud-app-tutorial)
  - [Table of Contents](#table-of-contents)
  - [0. Stack](#0-stack)
  - [1. REST API](#1-rest-api)
  - [2. Express App Setup](#2-express-app-setup)
  - [3. Config](#3-config)
  - [4. Model](#4-model)
    - [4.1. DTO](#41-dto)
  - [5. Service (Optional)](#5-service-optional)
  - [6. Controller](#6-controller)
  - [7. Routes](#7-routes)
  - [8. Middleware](#8-middleware)
    - [8.1. Exceptions](#81-exceptions)
    - [8.2. Logging](#82-logging)
  - [9. Testing](#9-testing)
  - [10. Security](#10-security)
  - [11. Express REST API Example (With Service)](#11-express-rest-api-example-with-service)
  - [12. Express REST API Example (No Service)](#12-express-rest-api-example-no-service)

## 0. Stack
MongoDB - Database

ExpressJS - Backend (api)

ReactJS - Frontend (ui)

NodeJS - Runtime

## 1. REST API
<ins>Guides:</ins>
<br />
[Create a MERN CRUD App (1/6) - Creating an Express backend (Youtube/CodingWithRobby) ](https://www.youtube.com/watch?v=jK7mcMrYzj8&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w)
<br />
[Build A REST API With Node.js, Express, & MongoDB - Quick (Youtube/WebDevSimplified)](https://www.youtube.com/watch?v=fgTGADljAeg&t=2s)
<br />
[ExpressJS 2022 Course (Youtube/AnsonTheDeveloper)](https://www.youtube.com/playlist?list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2)
<br />
[How to Build a REST API (Node.js & Express) (Youtube/Gravity)](https://www.youtube.com/watch?v=MDMWb1EM6O0)
<br />

<ins>Best Practice:</ins>
<br />
[REST API Mistakes Every Junior Developer should Avoid | clean-code (Youtube/CoderOne)](https://www.youtube.com/watch?v=JxeTegu4dD8)
<br />

Express.js, or simply Express, is a backend web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

It is an un-opinionated framework therefore you can organise your project however you like. This repo will serve as a guide and provide a general structure of how to organise your Express REST API's. A very popular and widely adopted pattern is MVC. The Model-View-Controller (MVC) pattern separates the application's concerns into three interconnected components:

- Model: This represents the data (entities/schema) and business logic of the application. In the context of an API, the model typically interacts with a database to retrieve or update data.
- View: This represents the user interface or presentation layer of the application. In the context of an API, the view is responsible for rendering the response that will be sent back to the client.
- Controller: This acts as an intermediary between the model and the view, handling user input and updating the model accordingly. In the context of an API, the controller receives requests from the client and sends responses back to the client, typically by calling the appropriate methods on the model and rendering the appropriate view.

This separation of concerns allows for better code organization, easier maintenance and testing, and improved scalability.

<ins>NOTE:</ins>
<br>
For the 'View' In REST API's, we typically will not be serving any static pages/resources. If there is a view, it maybe an index/welcome page that gives directions on how to call the API or a message/json that indicates that the server is currently running.

## 2. Express App Setup
Here are the steps to set up a basic Express app using npm:

1. Open a command prompt or terminal window and navigate to the directory where you want to create your project.
2. Run the following command to create a new npm project:

```bash
npm init
```
This will prompt you to enter various details about your project, such as its name, version, description, and author. You can either enter these details manually or accept the default values by pressing Enter.

1. Install the Express module by running the following command:

```bash
npm install express
```
This will download and install the latest version of Express and save it as a dependency in your project's package.json file.

1. Create a new file called index.js (or app.js) in the root directory of your project.
2. Paste the following code into index.js:

```js
const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

This code sets up an Express app with a single route that sends a "Hello, world!" message to the client.

1. Run the following command to start the server:

```bash
node index.js
```

This will start the server and print a message to the console indicating which port it's listening on.

1. Open a web browser and navigate to http://localhost:3000 (or whatever port you specified in .env file PORT variable). You should see the "Hello, world!" message displayed in the browser.

That's it! You've successfully set up an Express app using npm. You can now add more routes, middleware, and functionality to your app as needed.

<ins>NOTE:</ins>
<br>
- Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. Nodemon does not require any additional changes to your code or method of development. To use Nodemon, use `npm install nodemon` to install the packages to your project. Nodemon is a replacement wrapper for node so instead of entering `node index.js` in the terminal, you use `nodemon index.js`. 
- You can also further configure nodemon in "scripts" in the package.json file. The scripts property contains a set of entries; the key for each entry is a script name, and the corresponding value is a user-defined command to be executed. Scripts are frequently used to test, build, and streamline the needed commands to work with a module.

## 3. Config
In an Express REST API, the config folder typically contains configuration files for the application. These files can include environment variables, database configuration, third-party API keys, and other settings that are specific to the application.

Here are some examples of files that may be included in a config folder:

1. database.js - This file contains the configuration for the database connection. Here's an example:
   
```js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
```

<ins>NOTE:</ins> 
<br>
Here's an example of a database.js file using MongoDB with Mongoose:

```js
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;
```

In this example, we're using mongoose to connect to a MongoDB database. The uri variable is the connection string for the database, which is loaded from an environment variable. We then use mongoose.connect to connect to the database, and mongoose.connection to get the database connection object. Finally, we export the connection object so that it can be used throughout the application.

2. auth.js - This file contains configuration for authentication. Here's an example:

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      });
    }
  )
);
```

3. env.js - This file loads environment variables from a .env file. Here's an example:
   
```js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  API_KEY: process.env.API_KEY,
};
```

These are just a few examples of the types of files that might be included in a config folder. The specific contents of the folder can vary depending on the needs of the application.

## 4. Model
The Model layer in an Express REST API is responsible for defining the schema and interactions with the database for a particular resource. It typically contains the logic for querying, creating, updating, and deleting records in the database. The Model layer acts as an intermediary between the Controller layer (which handles incoming requests and responses) and the database.

Here are examples of using a SQL model (TypeORM) and a MongoDB model (Mongoose) for the same resource, in this case a User resource:

TypeORM model example:
```js
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

Mongoose model example:
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

As you can see, the TypeORM model defines an Entity class that defines the structure of the User resource, and uses decorators (annotations) to define the properties of the class. The Mongoose model uses a Schema object to define the structure of the User resource, and specifies the properties of the schema as objects with specific configurations. Both models are responsible for defining the schema and interactions with the database for the User resource, but they use different syntax and configuration options based on the database they are interacting with.

<ins>NOTE:</ins>
<br>
- Both TypeORM and Mongoose provide pre-built functions that can be used to interact with a database in an Express REST API. They are designed to make it easier to work with databases in an Express REST API, and they can save you a lot of time and effort compared to writing raw SQL queries or MongoDB commands.
- We can add validation to models by installing a validator package (like express-validator or validator) and specifying conditions on the model properties that validate user inputs. For an example of Mongoose validation with error handling see: [Node Auth Tutorial (JWT) #5 - Mongoose Validation (Youtube/TheNetNinja)](https://www.youtube.com/watch?v=nukNITdis9g&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=5).

### 4.1. DTO 

In a RESTful API, DTOs (Data Transfer Objects) are used to represent the data that is being transferred between the client and the server. They are essentially data containers that carry information about a particular entity or resource in the system. DTOs are often used to abstract away the internal details of the server-side data model and provide a standardized interface for clients to interact with.

Similarly, TypeScript interfaces are used to describe the structure of data objects in a TypeScript application. They define the shape of objects, their properties and their types, and can be used to enforce type checking during development. When used in a REST API, TypeScript interfaces can be thought of as DTOs, as they represent the data that is being sent and received by the API.

However, it is important to note that while TypeScript interfaces can be used as DTOs, they do not necessarily perform all the functions of a DTO. DTOs may also include additional functionality such as validation, data transformation, or serialization/deserialization. Nonetheless, TypeScript interfaces can be a useful tool in building DTOs in a TypeScript-based REST API.

Implementation of this is demonstrated in this tutorial: [7. DTO Implementation (Youtube/ProgrammingsFun)](https://www.youtube.com/watch?v=C8T-KsgLLO0)

<ins>Summary:</ins>

In TypeScript, both classes and interfaces can be used to define Data Transfer Objects (DTOs). The choice between using classes or interfaces will depend on the specific requirements of your application.

Interfaces are commonly used to define DTOs because they allow you to describe the structure of an object without providing an implementation for its methods. Interfaces are a lightweight way to enforce type safety in your code, and to provide a clear contract between different parts of your application.

Classes, on the other hand, can provide more functionality than interfaces, as they allow you to define both the structure and implementation of an object. Classes are often used when you need to define complex data structures that have methods or other behavior.

We are using a class to define our dto, because we also use some class validator decorators.

In general, if you only need to describe the structure of a DTO, an interface is the preferred choice. However, if you need to add methods or other behavior to your DTO, a class may be a better option.

Source: [API development with nodejs, express and typescript from scratch — DTO, Interface and Authentication (GitConnected/LukasWimhofer)](https://levelup.gitconnected.com/api-development-with-nodejs-express-and-typescript-from-scratch-dto-interface-and-54ebab8c447e)

## 5. Service (Optional)

In some cases, you may include a Service layer in between the Controller and Model. A Service is an intermediary between the Controller and the Model, responsible for implementing complex business logic, and accessing multiple Models. By including a Service layer, you can make your application more modular and easier to maintain.

There are several reasons why some Express REST APIs may use a Service layer, while others may not:

- Separation of concerns: A Service layer helps to separate the business logic from the Controller and Model layers. This makes the code easier to understand and maintain, and reduces the risk of introducing bugs or errors.
- Reusability: A Service layer can be used across multiple Controllers and Models, providing a centralized location for common functionality. This can save time and effort when building and maintaining multiple endpoints.
- Testing: By isolating the business logic in a Service layer, it becomes easier to unit test the logic without having to rely on the Controller or Model layers.
- Scalability: As an application grows in complexity, a Service layer can help to manage the complexity by providing a modular approach to the codebase. This can make it easier to scale and maintain the application over time.

However, there are cases where a Service layer may not be necessary or may add unnecessary complexity to the application. If the business logic is simple and straightforward, and there is no need for reusability or testing, a Service layer may be overkill. Ultimately, the decision to use a Service layer or not will depend on the specific needs of the application and the preferences of the development team.

<ins>NOTE:</ins>
<br> 
Example in Section: [10. Express REST API Example (With Service)](#10-express-rest-api-example-with-service)

## 6. Controller
A Controller handles requests and responses between the client and the server. It takes input from the user, retrieves data from the database using the Model, and then formats the data for the client. The Controller also handles errors and exceptions that may occur during the request.

<ins>NOTE:</ins>
<br> 
Examples in Sections: [10. Express REST API Example (With Service)](#10-express-rest-api-example-with-service) and
[11. Express REST API Example (No Service)](#11-express-rest-api-example-no-service)

## 7. Routes
A Route maps a URL path to a specific Controller function. It defines what HTTP methods (GET, POST, PUT, DELETE, etc.) are allowed for that endpoint.

<ins>NOTE:</ins>
<br>
Examples in Sections: [10. Express REST API Example (With Service)](#10-express-rest-api-example-with-service) and
[11. Express REST API Example (No Service)](#11-express-rest-api-example-no-service)

## 8. Middleware
In an Express REST API, Middleware functions are functions that are executed in the request-response cycle between the server receiving a request and sending a response back to the client. Middleware functions can be used for a variety of purposes, such as logging, authentication, error handling, and more. Middleware functions can be defined globally for the entire application, or locally for specific routes.

Here is an example of implementing some middleware functions that are commonly used in Express apps:

```js
// Logging middleware - logs request method, URL, and timestamp to the console
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next();
};

// Authentication middleware - checks if user is authenticated before allowing access to protected routes
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Error handling middleware - handles errors that occur during the request-response cycle
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Adding the middleware to the app
const express = require('express');
const app = express();

// Adding logging middleware globally
app.use(loggerMiddleware);

// Adding authentication middleware locally to a specific route
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route' });
});

// Adding error handling middleware globally
app.use(errorMiddleware);
```

In this example, we define three middleware functions: loggerMiddleware, authMiddleware, and errorMiddleware. The loggerMiddleware function logs the request method, URL, and timestamp to the console. The authMiddleware function checks if the user is authenticated before allowing access to protected routes. The errorMiddleware function handles errors that occur during the request-response cycle by logging the error to the console and returning an error response to the client.

We then add the middleware functions to the Express app using the `use()` method. We add the loggerMiddleware globally, so it will be executed for every incoming request. We add the authMiddleware locally to a specific route, so it will only be executed for requests to that route. Finally, we add the errorMiddleware globally to handle any errors that occur during the request-response cycle.

<ins>For MERN Stack Apps:</ins>

- We use `app.use(cors());` in Express when building a MERN (MongoDB, Express, React, Node) stack app to enable Cross-Origin Resource Sharing (CORS).

- CORS is a security feature implemented by web browsers that prevents a web page from making requests to a different domain than the one that served the web page. In the context of a MERN stack app, this means that the React client running in the user's browser cannot make requests to the Express server running on a different domain.

- By using `app.use(cors())` in Express, we are telling the server to include CORS headers in its responses, which will allow the React client to make requests to the Express server from a different domain.

- Note that it's important to properly configure CORS to avoid potential security vulnerabilities. For example, you may want to limit which domains are allowed to make requests to your server by passing an options object to `cors()`.

### 8.1. Exceptions

In an Express REST API, we can use an exception handler to catch and handle errors that occur during the execution of our application. Here's an example of how we can create an exception handler in an Express app:

<ins>NOTE:</ins>
<br>
errorHandler here is the same as errorMiddleware in above Section: [8. Middleware](#8-middleware)

```js
// error-handler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
```

In this example, we define a function called errorHandler that takes four parameters: `(err, req, res, next)`. This function is a middleware function that is used to handle errors that occur during the execution of our application.

Inside the errorHandler function, we log the error to the console using `console.error`, and then send a JSON response to the client with a status of 500 and a message of "Internal Server Error".

We can then use this error handler in our Express app by calling it after all other middleware functions and route handlers:
```js
// app.js
const express = require('express');
const errorHandler = require('./error-handler');
const todoRouter = require('./routes/todo.router');

const app = express();

app.use(express.json());
app.use('/todos', todoRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

In this example, we import our errorHandler middleware function and our todoRouter from their respective files. We then use `app.use` to add the errorHandler middleware function to our Express app after all other middleware functions and route handlers.

By adding the errorHandler middleware function to our app, any errors that occur during the execution of our app will be caught by this middleware function and handled appropriately, preventing the app from crashing and providing a more user-friendly error message to the client.

<ins>NOTE:</ins>
<br>
We can use this to handle all 5xx server errors outside of the Controller to make the code in Section: [11. Express REST API Example (No Service)](#11-express-rest-api-example-no-service) more readable. For example, we can implement the error/exception handler as shown in the video: [Hate Try...Catch Error Handling in Node.js? Do This Instead (Youtube/Gravity)](https://www.youtube.com/watch?v=s5YoXms0ECs). Thus, we only need if-else statements in the Controller layer (no try-catch required), that will return 2xx or 4xx codes, as any 5xx status codes will be handled directly by the exception handler in the Middleware (or Router/App) layer!

### 8.2. Logging

In an Express REST API, we can use a logger to keep track of application events and errors. We saw a basic example of this in Section: [8. Middleware](#8-middleware). Here's another example of how we can create and use a logger in an Express app:

```js
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
```

OR

```js
// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
```

In this example, we use the winston package to create a logger. We define a logger instance with the createLogger method, and set its log level to 'info'. We also define two transports, one for error logging and one for combined logging.

We can then use this logger in our application to log events and errors:

```js
// app.js
const express = require('express');
const logger = require('./logger');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  logger.info('Hello world!');
  res.send('Hello world!');
});

// error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// start server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
```

In this example, we import our logger from its respective file. We then use the logger to log a message inside our GET / endpoint. We also use the logger to log errors in our error handling middleware.

By using a logger in our application, we can keep track of events and errors, and use this information to debug and improve our application over time.

Here are some best practices for using logging in an Express REST API:

1. Use a logging library like winston that allows you to configure different transports for different log levels and formats.
2. Use log levels like error, warn, info, verbose, and debug to categorize your logs. Only use debug in development environments.
3. Include relevant information in your logs, like timestamps, request IDs, and error messages.
4. Log errors with stack traces so you can debug issues quickly.
5. Store logs in separate files, and rotate them regularly so they don't get too big.
6. Don't log sensitive information like passwords or credit card numbers.
7. Use middleware to log incoming requests and outgoing responses. This can help you diagnose issues and monitor performance.

Here's an example of how you could log incoming requests with middleware:
```js
// middleware/logger.js
const logger = require('../logger');

function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}

module.exports = requestLogger;
```

And here's an example of how you could use the middleware in your application:

```js
// app.js
const express = require('express');
const logger = require('./logger');
const requestLogger = require('./middleware/logger');

const app = express();

// middleware
app.use(express.json());
app.use(requestLogger);

// routes
app.get('/', (req, res) => {
  logger.info('Hello world!');
  res.send('Hello world!');
});

// error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// start server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
```

## 9. Testing

[Testing Node Server with Jest and Supertest (Youtube/SamMeech-Ward)](https://www.youtube.com/watch?v=FKnzS_icp20) - [GitHub](https://github.com/Sam-Meech-Ward/express_jest_and_mocks/tree/express)
<br>
[How to Test Your Express.js and Mongoose Apps with Jest and SuperTest (FreeCodeCamp/RakeshPotnuru)](https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/) - [GitHub](https://github.com/itsrakeshhq/jest-tests-demo)
<br>

Here's an example of how to set up and run tests using Jest (and Supertest) in an Express REST API:

1. Install Jest and any necessary dependencies:

```js
npm install --save-dev jest supertest
```

1. Create a new folder called tests in the root of your project.
2. Inside the tests folder, create a new file called example.test.js:

```bash
const request = require('supertest');
const app = require('../app');

describe('Example endpoint', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app).get('/example');
    expect(res.statusCode).toEqual(200);
  });
});
```

1. In the above example, we are testing the /example endpoint of our app. Replace this with the endpoint you want to test.
2. In the above example, we are using supertest to send HTTP requests to our app. Make sure to import app from your main index.js or app.js file.
3. In the above example, we are using the Jest expect function to make assertions about the response. You can add any additional assertions you need here.
4. In your package.json file, add the following under "scripts":

```json
"test": "jest"
```

1. Run the tests:

```bash
npm test
```

That's it! You should now see the results of your tests in the terminal.

<ins>NOTE:</ins>
<br>
Problem - If I use import/export from ES6 then all my Jest tests fail with error. Obviously there's a problem with import/export here. It's not practical for me to rewrite my code using ES5 syntax just to make my test framework happy.

Solution - [Configuring Jest to support ES6 import/export? (StackOverflow/PeterMortensen)](https://stackoverflow.com/a/59718259)

<ins>Mocking DB</ins>

[Express.js testing: mocking MongoDB (Medium/LucaPizzini)](https://medium.com/weekly-webtips/express-js-testing-mocking-mongodb-46c3797a201)

Problem - In my express rest api, I am testing my endpoints using jest and supertest. I have noticed that my tests are working, but they are interacting with the actual database. I want to use a fake temporary database so that any tests being run, do not effect the actual database.

Solution - To use a temporary fake database for testing your Express REST API, you can use a package like mongodb-memory-server. This package allows you to spin up an in-memory MongoDB database during the test setup and teardown. Here's an example of how to use it:

1. First, install the mongodb-memory-server package:

```bash
npm install mongodb-memory-server --save-dev
```

1. Create a separate configuration file for your test environment, where you will set up the in-memory MongoDB database. Here's an example of what that file could look like:

```js
// test/config.js

const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function () {
  const mongoServer = new MongoMemoryServer();

  const mongoUri = await mongoServer.getUri();
  const mongoOptions = {}; // any additional options you want to pass to mongoose.connect()

  return {
    mongoUri,
    mongoOptions
  };
};
```

This file exports an async function that sets up a new in-memory MongoDB database using the MongoMemoryServer class. It returns an object with the MongoDB connection URI and any additional options you want to pass to mongoose.connect().

1. In your test file, use the beforeAll and afterAll hooks to set up and tear down the database. Here's an example:

```js
// tests/app.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  const config = await require('../config')();
  mongoServer = await mongoose.connect(config.mongoUri, config.mongoOptions);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /users', () => {
  test('responds with a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// more test cases...
```

In this example, we use the beforeAll and afterAll hooks to set up and tear down the database using the config function from the previous step. In the test cases, we use `request(app)` to send HTTP requests to the API and make assertions using Jest's `expect` function.

By using mongodb-memory-server and setting up a temporary in-memory MongoDB database for testing, you can run your tests without affecting your production database.

## 10. Security
<ins>Guides:</ins>
<br>
[Create a MERN CRUD App (4/6) - Adding JWT Authentication to our Express server (Youtube/CodingWithRobby)](https://www.youtube.com/watch?v=fRkVmnc-gK4&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w&index=5)
<br>
[Node.js Auth Tutorial (JWT) [Playlist] (Youtube/TheNetNinja)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)

Here's a summary of the steps taken in the [tutorial](https://www.youtube.com/watch?v=fRkVmnc-gK4&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w&index=5) on adding JWT Authentication to an Express REST API:

1. Add "User" Model to define the user schema.

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

2. Create "User" Controller with the below methods/functions for handling user authentication.

```js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
  try {
    // Get the email and password off req body
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the data
    await User.create({ email, password: hashedPassword });

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    // Get the email and password off req body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    // Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    // create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    // clear cookie
    res.cookie("Authorization", "", { expires: new Date() });

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
```
<ins>Note:</ins>
<br>
We could extract some of the logic used in the Controller to a Service layer, as shown in Section: [10. Express REST API Example (With Service)](#10-express-rest-api-example-with-service), but for the purpose of this guide, it is not necessary.

<ins>Note:</ins>
<br>
- `signup()` - In this function it is imperative you do not save passwords in plain-text. Here, Bcrypt is used to encrypt the password before a user is created and stored in the database. To use Bcyrpt, use `npm install bcryptjs` to install the packages to your project.
<br>
- `login()` - In this function, a jwt token is issued if the user credentials are valid. Note that the ".env" file contains the secret key used to sign the end of the jwt token. To use JWT, use `npm install jsonwebtoken` to install the packages to your project. Also, cookies are used here to store the jwt token and its properties, such as expiration time and so on. To use cookies, use `npm install cookie-parser` to install the packages to your project (module used in app.js). The method in which the cookies are set in the response can vary, another configuration is: `res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });`
<br>
- `logout()` - In this function, the cookie that stores the jwt token is cleared upon reaching the logout endpoint.
<br>
- `checkAuth()` - This function is simply used to verify if the user has been authenticated or not.

3. Create the "Auth" Middleware that will be used to authenticate the jwt token in the cookie and check its validity (for the routes this middleware has been added to):

```js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Read token off cookies
    const token = req.cookies.Authorization;

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Check expiration
    if (Date.now() > decoded.exp) return res.sendStatus(401);

    // Find user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    // Attach user to req
    req.user = user;

    // Continue on
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
```

<ins>Note:</ins>
<br>
Don't forget to add the secret key to the ".env" file that is used to sign the end of the jwt token, which is being used here to decode and verify the token being passed in for any requests intercepted by the requireAuth middleware.

4. Update the "server.js" (or app.js/index.js/route.js) file to use the authentication routes and middleware.

```js
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
```

<ins>Note:</ins>
<br>
'/check-auth' endpoint uses the requireAuth middleware, therefore it is a protected route and only authenticated users can access it.

5. Add any extra configuration/middleware.

```js
//server.js

// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
/* NEW CONFIG */
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDb();

// Routing
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

// Start our server
app.listen(process.env.PORT);
```

<ins>Note:</ins>
<br>
- Must add middleware `cookieParser()`, remember to install using `npm i cookie-parser` and to import module. More info on this implementation at: [Node Auth Tutorial (JWT) #9 - Cookies Primer (Youtube/TheNetNinja)](https://www.youtube.com/watch?v=mevc_dl1i1I&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=10).
- If the Express App is interacting with a React App, on a different domain, special configuration must be applied on `cors()` middleware. This is done so requests from both apps on different ports will not fail when interacting with one another. as this Express App will be working with a React App which is itself hosted on a different domain. As both apps are hosted on different domains, this configuration must be applied. More info on this implementation at: [How to use CORS in Node.js with Express (Section/JosephChege)](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/).


Your Express App should now be secured with JWT's! You can test the authentication implementation by registering a user, logging in, and accessing a protected route.


## 11. Express REST API Example (With Service)
Here is an example of how the Model, Service and Controller components work together in an Express REST API:

```js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const UserService = require('../services/user');

// Define routes for the users resource
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// Controller functions for the user resource
const UserController = {
  getAllUsers: async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  },

  getUserById: async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  },

  createUser: async (req, res) => {
    const newUser = await UserService.createUser(req.body);
    res.json(newUser);
  },

  updateUser: async (req, res) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  },

  deleteUser: async (req, res) => {
    await UserService.deleteUser(req.params.id);
    res.sendStatus(204);
  }
};

// Service functions for the user resource
const UserService = {
  getAllUsers: async () => {
    return await UserModel.find();
  },

  getUserById: async (id) => {
    return await UserModel.findById(id);
  },

  createUser: async (data) => {
    const user = new UserModel(data);
    return await user.save();
  },

  updateUser: async (id, data) => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteUser: async (id) => {
    await UserModel.findByIdAndDelete(id);
  }
};

module.exports = router;
```

In this example, the Model is represented by the UserModel, the Controller is represented by the UserController, and the Route is defined using the Express Router. The UserService is an intermediary between the UserController and UserModel, responsible for implementing complex business logic, and accessing multiple Models.

## 12. Express REST API Example (No Service)

<ins>NOTE:</ins>
<br> 
🚨 This is the most common approach for creating Express REST API's.
<br>
🚨 This does not mean it is the only approach and that Services are bad, it is simply something to consider when reading other devs API's and developing your own.



Here's an example of an Express REST API that uses a Model and Controller, but doesn't use a Service layer:

```js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

// Define routes for the users resource
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// Controller functions for the user resource
const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = new UserModel(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = router;
```

In this example, the Controller handles requests and responses directly with the Model. Each Controller function performs a try-catch block to handle errors and exceptions that may occur during the request.