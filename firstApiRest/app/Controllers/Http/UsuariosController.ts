import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {

    public async setRegistrarUsuario({request, response}:HttpContextContract){  //metodo asincrono
        const dataUsuario = request.only(["codigo_usuario","nombre_usuario","contrasena","email","telefono","perfil"])
        try {
            const codigoUsuario = dataUsuario.codigo_usuario
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            if(usuarioExistente===0){

                await Usuario.create(dataUsuario);
                response.status(200).json({"msg":"Registro completo con exito"})
            }else{
                response.status(400).json({"msg":"Error, codigo existente"})
            }
        } catch (error) {
            response.status(500).json({"msg":"Error en el servidor"})
            
        }
    }
    
    private async getValidarUsuarioExistente(codigoUsuario: Number): Promise<Number>{
        const total = await Usuario.query().where({"codigo_usuario":codigoUsuario}).count("*").from("usuarios");
        return parseInt(total[0]["count(*)"])


    }

    public async getListarUsuarios(): Promise<Usuario[]>{
        const user = await Usuario.all();
        return user;
    }


    public async buscarPorId({ request }: HttpContextContract){
        const id = request.param("id");
        const user = await Usuario.find(id);
        return user;
    }

    public async actualizarUsuario({ request }: HttpContextContract){
        const id=request.param("id");  //se recibe el parametro de la solicitud
        const user = request.all();  //se recibe el json y se asigna todos los atributos a user
        await Usuario.query().where("codigo_usuario",id).update({
            nombre_usuario: user.nombre,
            contrasena: user.contrasena,
            email: user.email,
            telefono: user.telefono});

        return("Registro actualizado");
    }

    public async eliminarUsuario({request}:HttpContextContract){
        const id = request.param("id");
        await Usuario.query().where("codigo_usuario",id).delete();

        return ("Registro eliminado")
    }

    public async  filtroPorNombre({request}: HttpContextContract){
        const search = request.param("search");
        const users = await Usuario.query().where("nombre_usuario","like",`${search}%`);
        return users;
    }
}


