import * as http from 'http';
import dotenv from 'dotenv'
import App from './app';
import { Database } from './config/database';

/**
 * Load Configs
 * 
 */
dotenv.config();

/**
 * Create Server
 * 
 */
const server = http.createServer(App);

/**
 * DataSource
 * 
 */
Database.initialize()
.then(res => {
    console.log("DB Connected");
}).catch(e => {
    console.error(`DB Connection Error: ${e}`)
})

// Port
const PORT = process.env.PORT || 3000;

/**
 * Start Listening
 * 
 */
server.listen(PORT, () => {
    console.log(`Server is on PORT: ${PORT}`);
})