## Shaw and patterns test [BACKEND]

# Instructions
- Install dependencies
    ```bash
    # node version v18.17.1 (stable)
    npm install
    ```
- How to run 
    ```bash
    npm run dev
    ```
- How to run tests
    ```bash
    npm run test
    ```
## What i did?:

- **Create users by csv file**
    - [POST] - `/api/files`
- **Get users stored in db and with possibility to search users by "q" on query params**
    - [GET] - `/api/files`

## Application Details:
- Developed using Clean Architecture principles and incorporates some Domain-Driven Design (DDD) concepts.
- I've opted for a memory database implemented as an array to streamline the development process and avoid the added complexity of setting up a separate database system.
- This is a lightweight application without reliance on any frameworks. It utilizes native Node.js modules, and only requires libraries for TypeScript transpilation (e.g., `ts-node-dev`, `blob`, `tsx`).
- Includes both unit tests and integration tests.
- This application exclusively relies on native Node.js modules. Therefore, I've taken on the challenge of creating custom utilities for tasks like parsing files in requests and manually routing requests. While using established libraries or frameworks could have reduced complexity, I wanted to challenge myself and gain a deeper understanding of the underlying processes. 😊
