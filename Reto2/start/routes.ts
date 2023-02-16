/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(()=>{
  
  Route.get("/listar-animales","AnimalesController.getListarAnimales")
  Route.get("listar-especie/:especie","AnimalesController.buscarPorEspecie")
  Route.get("/listar-menores8","AnimalesController.buscarMenores8")

  Route.put("/actualizar/:codigo","AnimalesController.actualizarAnimal")

  Route.post("/registro-animales","AnimalesController.setRegistrarAnimal")

  Route.delete("/eliminar/:codigo","AnimalesController.eliminarAnimal")

}).prefix("/api");
