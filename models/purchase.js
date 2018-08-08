module.exports = function(sequelize, DataTypes){
var Purchase = sequelize.define("Purchase", {
name : DataTypes.STRING,
description : DataTypes.STRING,
price : DataTypes.INTEGER,
date : DataTypes.DATE

});
return Purchase;

};