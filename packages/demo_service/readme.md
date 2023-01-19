# Server #

## Introduction ##

The server part of the demo implements all the backend code for the demo. This includes:

* The database for both CDC and State cases
* The EpiCast publish and EpiCast read functions

## Sources ##

1. Created the shell of the server using an Typescript express genorator

    ```shell
    ts-express --no-view server
    ```

2. Added Sequlize and Sequlize-Typescript, Sqlite3
