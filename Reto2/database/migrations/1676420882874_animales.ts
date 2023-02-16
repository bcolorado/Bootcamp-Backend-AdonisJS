import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Animales extends BaseSchema {
  protected tableName = 'animales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("codigo_animal").primary().unsigned()/* codigo_animal llave primaria*/
      table.string("nombre_animal", 100).notNullable()
      table.integer('especie').notNullable().unsigned()
      table.integer('raza').notNullable().unsigned()
      table.integer('genero').notNullable().unsigned()
      table.integer('edad').notNullable().unsigned()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
