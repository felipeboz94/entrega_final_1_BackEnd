/*Para iniciar tsconfig:
tsc --version
si no está instalado: npm install -g typescript
luego tsc --init
*/
import express, {Application} from "express";
import routerProductos from "./routes/routerProductos"
import routerCarritos from "./routes/routerCarritos"
const app: Application = express();


app.use(express.json());    //middleware que transforma la req.body a un json
app.use(express.urlencoded({extended:true}));
app.use('/api/products',routerProductos);
app.use('/api/carts',routerCarritos);
app.use(express.static('public'));


const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});

server.on('error',(err)=>{
    console.log(err);
})

