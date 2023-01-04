# nodejs-logging

## PREREQUISITES

- nodejs 18.12.x or >
- npm 8.19.x or >
- apache bench

## STEPS TO RUN

1. npm install
2. verify if pinoLogs and winstonLogs dir are present if not create em
3. node pino.index.js
4. node winston.index.js

## PERFORMANCE TEST

1. ```text
   ab -n 10000 -c 1000 http://localhost:3001/winston
   ```
2. ```text
   ab -n 10000 -c 1000 http://localhost:3000/pino
   ```

### no logs
![noLogs](https://user-images.githubusercontent.com/26568137/210473138-2237e768-ef78-4feb-a60a-646203fc2c3a.png)

### pino
![pinoLogs](https://user-images.githubusercontent.com/26568137/210473142-31814ad0-e363-4d66-a636-081ebcae3e5c.png)

### winston
![winstonLogs](https://user-images.githubusercontent.com/26568137/210473143-d908ba60-2920-4520-9446-aedd233b8700.png)
