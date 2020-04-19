# Skeleton Node.js Typescript Express app

## ❯ Table of Contents

- [Skeleton Node.js Typescript Express app](#skeleton-nodejs-typescript-express-app)
  - [❯ Table of Contents](#%e2%9d%af-table-of-contents)
  - [❯ Getting Started](#%e2%9d%af-getting-started)
    - [Step 1: Set up the Development Environment](#step-1-set-up-the-development-environment)
    - [Step 2: Create new Project](#step-2-create-new-project)
    - [Step 3: Serve your App](#step-3-serve-your-app)
  - [❯ Scripts and Tasks](#%e2%9d%af-scripts-and-tasks)
    - [Install](#install)
    - [Linting](#linting)
    - [Tests](#tests)
    - [Running in dev mode](#running-in-dev-mode)
    - [Building the project and run it](#building-the-project-and-run-it)
  - [❯ Debugger in VSCode](#%e2%9d%af-debugger-in-vscode)
  - [❯ API Routes](#%e2%9d%af-api-routes)
  - [❯ Project Structure](#%e2%9d%af-project-structure)
  - [❯ Logging](#%e2%9d%af-logging)
  - [❯ Event Dispatching](#%e2%9d%af-event-dispatching)
  - [❯ Further Documentations](#%e2%9d%af-further-documentations)

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`.

Then install your dependencies.

```bash
npm install
```

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
npm start
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

## ❯ Scripts and Tasks

### Install

- Install all dependencies with `npm install`

### Linting

- Run the `lint` vscode task.

### Tests

- Run the unit tests using `npm test` (There is also a vscode task for this called `test`).
- Run the integration tests using `npm run test:integration`.
- Run the e2e tests using `npm run test:e2e`.

### Running in dev mode

- Run `npm run start:dev` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `npm build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `npm start`.

## ❯ Debugger in VSCode

To debug your code run `npm build` or hit <kbd>cmd</kbd> + <kbd>b</kbd> to build your app.
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.

## ❯ API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api**       | Shows us the name, description and the version of the package.json |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/monitor**   | Shows a small monitor page for the server |
| **/api/login** | Login endpoint, takes username & password and returns a UUID & a GIS token |
| **/api/logout**  | Logout endpoint, takes token and returns status as a boolean |

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/controllers/requests**  | Request classes with validation rules if the body is not equal with a model |
| **src/api/controllers/responses** | Response classes or interfaces to type json response bodies  |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/api/middlewares/**          | Express Middlewares like helmet security features |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/validators/**           | Custom validators, which can be used in the request classes |
| **src/auth/**                     | Authentication checkers and services |
| **src/core/**                     | The core features like logger and env variables |
| **src/decorators/**               | Custom decorators like @Logger & @EventDispatch |
| **src/loaders/**                  | Loader is a place where you can configure your app |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts             | Custom type definitions and files that aren't on DefinitelyTyped |
| **test**                          | Tests |
| **test/e2e/** *.test.ts           | End-2-End tests (like e2e) |
| **test/integration/** *.test.ts   | Integration test with SQLite3 |
| **test/unit/** *.test.ts          | Unit tests |
| .env.example                      | Environment configurations |
| .env.test                         | Test environment configurations |

## ❯ Logging

Our logger is [winston](https://github.com/winstonjs/winston). To log http request we use the express middleware [morgan](https://github.com/expressjs/morgan).
We created a simple annotation to inject the logger in your service (see example below).

```typescript
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    ...
```

## ❯ Event Dispatching

We use this awesome repository [event-dispatch](https://github.com/pleerock/event-dispatch) for event dispatching.
We created a simple annotation to inject the EventDispatcher in your service (see example below). All events are listed in the `events.ts` file.

```typescript
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';

@Service()
export class UserService {

    constructor(
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) { }

    public async create(user: User): Promise<User> {
        ...
        this.eventDispatcher.dispatch(events.user.created, newUser);
        ...
    }
```

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Microframework](https://github.com/pleerock/microframework) | Microframework is a simple tool that allows you to execute your modules in a proper order, helping you to organize bootstrap code in your application. |
| [TypeDI](https://github.com/pleerock/typedi) | Dependency Injection for TypeScript. |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [class-validator](https://github.com/pleerock/class-validator) | Validation made easy using TypeScript decorators. |
| [class-transformer](https://github.com/pleerock/class-transformer) | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors |
| [event-dispatcher](https://github.com/pleerock/event-dispatch) | Dispatching and listening for application events in Typescript |
| [Helmet](https://helmetjs.github.io/) | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! |
| [Auth0 API Documentation](https://auth0.com/docs/api/management/v2) | Authentification service |
| [Jest](http://facebook.github.io/jest/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [supertest](https://github.com/visionmedia/supertest) | Super-agent driven library for testing node.js HTTP servers using a fluent API |
| [nock](https://github.com/node-nock/nock) | HTTP mocking and expectations library |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |