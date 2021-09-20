'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Tasks', [
      {name: 'Homework', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */
     Example:
     await queryInterface.bulkDelete('Tasks', null, {});
  }
};
