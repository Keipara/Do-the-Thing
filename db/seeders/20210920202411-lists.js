'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */

   await queryInterface.bulkInsert('Lists', [
   {id: 1, name: "All Tasks", userId: 1, createdAt: new Date(), updatedAt: new Date()},
   {id: 2, name: "App-Academy", userId: 1, createdAt: new Date(), updatedAt: new Date()},
   {id: 3, name: "Readings", userId: 1, createdAt: new Date(), updatedAt: new Date()},
   {id: 4, name: "Project", userId: 1, createdAt: new Date(), updatedAt: new Date()},
   {id: 5, name: "Leetcode", userId: 1, createdAt: new Date(), updatedAt: new Date()}
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
