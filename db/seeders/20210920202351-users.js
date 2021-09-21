'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users',
     [{firstName: 'Demo', lastName: 'User', email: 'demouser@demo.com', username: 'demouser', hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date()}
        ],
         {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
