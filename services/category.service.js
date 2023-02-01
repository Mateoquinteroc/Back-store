const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.category.create(data);
    return newCategory;
  }

  async find() {
    const categories= await models.category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CategoryService;
