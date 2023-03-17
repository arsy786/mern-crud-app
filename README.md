# MERN CRUD APP TUTORIAL

## Table of Contents
- [MERN CRUD APP TUTORIAL](#mern-crud-app-tutorial)
  - [Table of Contents](#table-of-contents)
  - [0. Stack](#0-stack)
  - [1. REST API](#1-rest-api)
  - [2. Express App Setup](#2-express-app-setup)
  - [3. Config](#3-config)
  - [4. Model](#4-model)
  - [5. Service (Optional)](#5-service-optional)
  - [6. Controller](#6-controller)
  - [7. Routes](#7-routes)
  - [8. Middleware](#8-middleware)
  - [9. Extra Features](#9-extra-features)
    - [9.1. Exceptions](#91-exceptions)
    - [9.2. Testing](#92-testing)
    - [9.3. DTO Layer](#93-dto-layer)
    - [9.4. Logging](#94-logging)
    - [9.5. Security](#95-security)
  - [10. Express REST API Example (With Service)](#10-express-rest-api-example-with-service)
  - [11. Express REST API Example (No Service)](#11-express-rest-api-example-no-service)

## 0. Stack
MongoDB - Database

ExpressJS - Backend (api)

ReactJS - Frontend (ui)

NodeJS - Runtime

## 1. REST API
[Create a MERN CRUD App (1/6) - Creating an Express backend (Youtube/CodingWithRobby) ](https://www.youtube.com/watch?v=jK7mcMrYzj8&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w)

[Build A REST API With Node.js, Express, & MongoDB - Quick (Youtube/WebDevSimplified)](https://www.youtube.com/watch?v=fgTGADljAeg&t=2s)

Express is an un-opinionated framework therefore you can organise your project however you like. However, a very popular and widely adopted pattern is MVC. MVC (Model-View-Controller) is a software design pattern that separates an application into three interconnected components:

- Model: represents the data and entities/schema of the application.
- View: displays the data to the user and handles user input.
- Controller: handles user input, applies business logic, updates the model, and updates the view accordingly.

This separation of concerns allows for better code organization, easier maintenance and testing, and improved scalability.

Note: For the 'View' In REST API's, we typically will not be serving any static pages/resources (maybe an index/welcome page that gives directions on how to call the API).

## 2. Express App Setup
Here are the steps to set up an Express app using npm:

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

1. Create a new file called index.js in the root directory of your project.
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

1. Open a web browser and navigate to http://localhost:3000 (or whatever port you specified). You should see the "Hello, world!" message displayed in the browser.

That's it! You've successfully set up an Express app using npm. You can now add more routes, middleware, and functionality to your app as needed.

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

NOTE: here's an example of a database.js file using MongoDB with Mongoose:

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

As you can see, the TypeORM model defines an Entity class that defines the structure of the User resource, and uses decorators to define the properties of the class. The Mongoose model uses a Schema object to define the structure of the User resource, and specifies the properties of the schema as objects with specific configurations. Both models are responsible for defining the schema and interactions with the database for the User resource, but they use different syntax and configuration options based on the database they are interacting with.

NOTE: Both TypeORM and Mongoose provide pre-built functions that can be used to interact with a database in an Express REST API. They are designed to make it easier to work with databases in an Express REST API, and they can save you a lot of time and effort compared to writing raw SQL queries or MongoDB commands.

## 5. Service (Optional)

In some cases, you may include a Service layer in between the Controller and Model. A Service is an intermediary between the Controller and the Model, responsible for implementing complex business logic, and accessing multiple Models. By including a Service layer, you can make your application more modular and easier to maintain.

There are several reasons why some Express REST APIs may use a Service layer, while others may not:

- Separation of concerns: A Service layer helps to separate the business logic from the Controller and Model layers. This makes the code easier to understand and maintain, and reduces the risk of introducing bugs or errors.
- Reusability: A Service layer can be used across multiple Controllers and Models, providing a centralized location for common functionality. This can save time and effort when building and maintaining multiple endpoints.
- Testing: By isolating the business logic in a Service layer, it becomes easier to unit test the logic without having to rely on the Controller or Model layers.
- Scalability: As an application grows in complexity, a Service layer can help to manage the complexity by providing a modular approach to the codebase. This can make it easier to scale and maintain the application over time.

However, there are cases where a Service layer may not be necessary or may add unnecessary complexity to the application. If the business logic is simple and straightforward, and there is no need for reusability or testing, a Service layer may be overkill. Ultimately, the decision to use a Service layer or not will depend on the specific needs of the application and the preferences of the development team.

Note: Example below.

## 6. Controller
A Controller handles requests and responses between the client and the server. It takes input from the user, retrieves data from the database using the Model, and then formats the data for the client. The Controller also handles errors and exceptions that may occur during the request.

Note: Example below.

## 7. Routes
A Route maps a URL path to a specific Controller function. It defines what HTTP methods (GET, POST, PUT, DELETE, etc.) are allowed for that endpoint.

Note: Example below.

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

We then add the middleware functions to the Express app using the use() method. We add the loggerMiddleware globally, so it will be executed for every incoming request. We add the authMiddleware locally to a specific route, so it will only be executed for requests to that route. Finally, we add the errorMiddleware globally to handle any errors that occur during the request-response cycle.

## 9. Extra Features

### 9.1. Exceptions
In an Express REST API, we can use an exception handler to catch and handle errors that occur during the execution of our application. Here's an example of how we can create an exception handler in an Express app:

```js
// error-handler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
```

In this example, we define a function called errorHandler that takes four parameters: err, req, res, and next. This function is a middleware function that is used to handle errors that occur during the execution of our application.

Inside the errorHandler function, we log the error to the console using console.error, and then send a JSON response to the client with a status of 500 and a message of "Internal Server Error".

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

In this example, we import our errorHandler middleware function and our todoRouter from their respective files. We then use app.use to add the errorHandler middleware function to our Express app after all other middleware functions and route handlers.

By adding the errorHandler middleware function to our app, any errors that occur during the execution of our app will be caught by this middleware function and handled appropriately, preventing the app from crashing and providing a more user-friendly error message to the client.

### 9.2. Testing


### 9.3. DTO Layer
TBC

### 9.4. Logging
In an Express REST API, we can use a logger to keep track of application events and errors. Here's an example of how we can create and use a logger in an Express app:

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

### 9.5. Security
TBC

## 10. Express REST API Example (With Service)
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

## 11. Express REST API Example (No Service)

🚨🚨🚨

NOTE: This is the most common approach for creating Express REST API's.

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