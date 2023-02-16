import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {                                        /*Función que se ejecuta cuando se realiza la migración a algún gestor de bases de datos*/ 
    this.schema.createTable(this.tableName, (table) => {
      table.integer("codigo_usuario").primary().unsigned()/* codigo_usuario llave primaria*/
      table.string("nombre_usuario", 100).notNullable()
      table.string('contrasena', 100).notNullable()
      table.string('email', 100).notNullable()
      table.string('telefono', 15).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {                     /*Función que se ejecuta cuando se hace rollback*/ 
    this.schema.dropTable(this.tableName)
  }
}

//En consola podemos mirar el status de la migración y hacer rollback a algún punto deseado 




  