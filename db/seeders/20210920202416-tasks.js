'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Tasks', [
      {name: 'Homework Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Food Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Coding Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'More food Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sleep Bubba', complete: false, listId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Food Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Coding Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'More food Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Homework Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sleep Demo', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
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
