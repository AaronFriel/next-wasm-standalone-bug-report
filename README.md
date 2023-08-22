# Standalone WASM Bug Report

Including WASM files with next.js standalone fails. This example uses @dqbd/tiktoken as a proof of concept.

Running the developer build (`npm run dev`) and accessing localhost:3000 works, you should see a page like below.

When running the standalone build via `docker compose up`, however, the API route will return an internal server error.
This error has `tiktoken_bg.wasm` missing from the standalone build:

```
web  | Listening on port 3000 url: http://f1351de2d44b:3000
web  | Error: Missing tiktoken_bg.wasm
web  |     at 7079 (/app/apps/web/.next/server/chunks/512.js:303:26)
web  |     at __webpack_require__ (/app/apps/web/.next/server/webpack-runtime.js:25:42)
web  |     at 1200 (/app/apps/web/.next/server/app/api/token-test/route.js:133:72)
web  |     at __webpack_require__ (/app/apps/web/.next/server/webpack-runtime.js:25:42)
web  |     at 8678 (/app/apps/web/.next/server/app/api/token-test/route.js:80:17)
web  |     at __webpack_require__ (/app/apps/web/.next/server/webpack-runtime.js:25:42)
web  |     at __webpack_exec__ (/app/apps/web/.next/server/app/api/token-test/route.js:165:39)
web  |     at /app/apps/web/.next/server/app/api/token-test/route.js:166:70
web  |     at __webpack_require__.X (/app/apps/web/.next/server/webpack-runtime.js:150:21)
web  |     at /app/apps/web/.next/server/app/api/token-test/route.js:166:47
```

## Expected result

> # Server component
> Tokens: 25
>
> Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.
> # Client component
> Tokens: 25
>
> Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.
>
> # API route
> Response status: OK
>
> Tokens: 25
>
> Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.

# Turborepo Docker starter

This is an official Docker starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-docker
```

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [Express](https://expressjs.com/) server
- `ui`: ui: a React component library
- `eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Remote Caching

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/web/Dockerfile . --build-arg TURBO_TEAM=“your-team-name” --build-arg TURBO_TOKEN=“your-token“ --no-cache`

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
