"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*Para iniciar tsconfig:
tsc --version
si no está instalado: npm install -g typescript
luego tsc --init
*/
const express_1 = __importDefault(require("express"));
const routerProductos_1 = __importDefault(require("./routes/routerProductos"));
const routerCarritos_1 = __importDefault(require("./routes/routerCarritos"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware que transforma la req.body a un json
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/products', routerProductos_1.default);
app.use('/api/carts', routerCarritos_1.default);
app.use(express_1.default.static('public'));
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
server.on('error', (err) => {
    console.log(err);
});
