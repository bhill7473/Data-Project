module.exports = function(sequelize, DataTypes) {
  var Bill = sequelize.define("Bill", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE
  });
  return Bill;
};
