'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Tasks', [
      {name: 'Homework Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Food Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Coding Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'More food Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sleep Bubba', due: new Date(), complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Food Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Coding Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'More food Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sleep Demo', due: new Date(), complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
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
