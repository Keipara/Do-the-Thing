'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    due: DataTypes.DATE,
    complete: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.List, {
      foreignKey: 'listId',
  })
  };
  return Task;
};
