import app from './app.js';
import { PORT } from './config.js';

app.listen(PORT, () => {
    console.log('running on port 3000...');
});