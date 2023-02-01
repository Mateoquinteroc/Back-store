const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){}


  async create(data) {
    const newOrder = await models.order.create(data);
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.orders_products.create(data);
    return newItem;
  }

  // async find() {
  //   const orders = await models.order.findAll({
  //     include: ['customer']
  //   });
  //   return orders;
  // }

  async findOne(id) {
    const order = await models.order.findByPk(id, {
      include:[
        {
          association: 'customer',
          include: ['user']
        }, 
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('product not found');
    }
    return order;
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

module.exports = OrderService;
