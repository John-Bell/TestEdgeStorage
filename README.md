# TestEdgeStorage

## Description
`TestEdgeStorage` is a test skill designed specifically for the Google Gemma 4 Edge gallery. Its primary purpose is to validate and benchmark SQLite database operations and persistence within the Gemma 4 Edge environment. 

## Features
* **SQLite Initialization:** Tests the creation and connection to a local SQLite database on the edge device.
* **CRUD Operations:** Executes standard Create, Read, Update, and Delete commands to ensure full database functionality.
* **Storage Validation:** Verifies data persistence, read/write speeds, and storage constraints within the Edge gallery context.

## Prerequisites
* Google Gemma 4 Edge environment.
* Compatible edge hardware with local storage access.

## Installation
1. Clone or download this project to your local workspace.
2. Package the skill assets according to the Gemma 4 Edge gallery specifications.
3. Sideload or deploy the packaged skill into your Gemma 4 Edge testing environment.

## Usage
Once deployed, trigger the `TestEdgeStorage` skill. The skill will execute an automated test suite that performs the following:
1. Database creation (e.g., `edge_test.sqlite`).
2. Table instantiation.
3. Record insertion, querying, and updating.
4. Teardown and cleanup operations (optional, based on your test parameters).

Monitor your environment's console or application logs for the pass/fail output of the SQLite tests.

## License
This project is for testing purposes and is provided "as-is".
