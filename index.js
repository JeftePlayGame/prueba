import App from './config/app.config.js';

const port = process.env.PORT || 3000;

const app = new App().app;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Importa y registra las rutas
import { mainRoutes } from './routes/main.routes.js';

const routes = new mainRoutes();
routes.routes(app);