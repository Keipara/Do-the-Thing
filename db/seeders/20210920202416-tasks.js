'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Tasks', [
      {name: 'Check-In: Morning', complete: true, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Check-In: Midday', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Check-In: Afternoon', complete: false, listId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Secure Password Hashing', complete: true, listId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'RESTful APIs', complete: true, listId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cross-Origin Request Sharing', complete: false, listId: 3, description: "Ask about CORS bug", createdAt: new Date(), updatedAt: new Date()},
      {name: 'An Overview of OAuth 2.0', complete: false, listId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Token-Based Authentication', complete: false, listId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: 'API Documentation', complete: false, listId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Database Schema', complete: false, listId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Frontend Routes', complete: false, listId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'MVP Feature List', complete: false, listId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'User Stories', complete: false, listId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Dynamic Programming', complete: false, listId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Recursion', complete: false, listId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Graph', complete: false, listId: 5, createdAt: new Date(), updatedAt: new Date()},
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
