'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
  //  await queryInterface.bulkInsert('Lists',
  //  [{name: 'Test', userId: "100", createdAt: new Date(), updatedAt: new Date()}
  // ], {});
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
