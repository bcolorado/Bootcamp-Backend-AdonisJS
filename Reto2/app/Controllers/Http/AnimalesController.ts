import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animale from "App/Models/Animale"
export default class AnimalesController {

    public async setRegistrarAnimal({request,response}:HttpContextContract){
        const dataAnimal = request.only(["codigo_animal","nombre_animal","especie","raza","genero","edad"])
        try {
            const codigoAnimal= dataAnimal.codigo_animal;
            const animalExistente: Number = await this.getValidarAnimalExistente(codigoAnimal);
            if(animalExistente === 0){
                await Animale.create(dataAnimal);
                response.status(200).json({"msg":"Registro completo con exito"})
            }else{
                response.status(400).json({"msg":"Error, codigo existente"})
            }
        } catch (error) {
            response.status(500).json({"msg":"Error en el servidor"})
        }
    }

    private async getValidarAnimalExistente(codigoAnimal: Number): Promise<Number>{
        const total = await Animale.query().where({"codigo_animal":codigoAnimal}).count("*").from("animales");
        return parseInt(total[0]["count(*)"])
    }

    public async getListarAnimales(): Promise<Animale[]>{
        const animales = await Animale.all();
        return animales;
    }

    public async buscarPorEspecie({ request }: HttpContextContract){
        const especie = request.param("especie");
        const animal = await Animale.find(especie);
        return animal;
    }


    public async buscarMenores8():Promise<Animale[]>{
        const animales = await Animale.query().where("edad","<",8);
        return animales;
    }

    public async actualizarAnimal({ request }: HttpContextContract){
        const codigo=request.param("codigo");  //se recibe el parametro de la solicitud
        const user = request.all();  //se recibe el json y se asigna todos los atributos a user
        await Animale.query().where("codigo_animal",codigo).update({
            codigo_animal: user.codigo_animal,
            nombre_animal: user.nombre_animal,
            especie: user.especie,
            raza: user.raza,
            genero: user.genero,
            edad: user.edad});

        return("Registro actualizado");
    }


    public async eliminarAnimal({request}:HttpContextContract){
        const codigo = request.param("codigo");
        await Animale.query().where("codigo_animal",codigo).delete();

        return ("Registro eliminado")
    }


   

}
