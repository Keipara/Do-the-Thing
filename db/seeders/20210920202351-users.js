'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Users', [{
      id: 1, firstName: "Demo",
      lastName: "User",
      email: "demouser@demo.com",
      username: "DemoUser",
      hashedPassword: "$2a$10$K7mUOLmkdHBMlnb.OF9T6utsKKJ8qT4LtdRgWyUOlpODBYc11z14u",
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    // await queryInterface.bulkInsert('Users',{});
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
