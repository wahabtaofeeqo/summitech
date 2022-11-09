import * as http from 'http';
import dotenv from 'dotenv'
import App from './app';

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

// Port
const PORT = process.env.PORT || 5000;

/**
 * Start Listening
 * 
 */
server.listen(PORT, () => {
    console.log(`Server is on PORT: ${PORT}`);
})