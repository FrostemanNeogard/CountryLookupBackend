## CountryLookupBackend
This is a server made to be used with the frontend repository which can be found [here](https://github.com/FrostemanNeogard/CountryLookupFrontend).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/FrostemanNeogard/CountryLookupBackend.git
    cd CountryLookupBackend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the application by updating the `.env` file with the following variables:
- FIXER_API_KEY
  - This can be found at [fixer.io](https://fixer.io/) after creating a free account.
- JWT_SECRET
  - Secret hash used for login authentication.

4. Start the server:

    ```bash
    npm start
    ```

## Usage

After installation, the API will be available at `http://localhost:3000` by default, this can be changed in the `config.ts` file. You can use tools like `curl` or Postman to interact with the API.

## API Endpoints

- **POST /auth/login  (PUBLIC)**: Authenticate user via username and password.
  - Note: this server is not connected to a database and only contains one valid hard-coded login, that being `username: admin password: admin`.
- **GET /country/{name} (PROTECTED)**: Retrieve an object containing information regarding the given country.

## Node packages used for this repository:
- @nestjs
  - [/axios](https://www.npmjs.com/package/@nestjs/axios)
  - [/common](https://www.npmjs.com/package/@nestjs/common)
  - [/config](https://www.npmjs.com/package/@nestjs/config)
  - [/core](https://www.npmjs.com/package/@nestjs/core)
  - [/jwt](https://www.npmjs.com/package/@nestjs/jwt)
  - [/mapped-types](https://www.npmjs.com/package/@nestjs/mapped-types)
  - [/platform-express](https://www.npmjs.com/package/@nestjs/platform-express)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [circular-json](https://www.npmjs.com/package/circular-json)