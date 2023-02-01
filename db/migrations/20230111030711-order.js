const { OrderSchema, ORDER_TABLE } = require('./../models/order.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
      await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
