var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/bills", function(req, res) {
    db.Bill.findAll({}).then(function(dbBills) {
      res.json(dbBills);
    });
  });
  //get total of all bills
  app.get("/api/billsTotal", function(req, res) {
    db.Bill.query("SELECT SUM 'amount' FROM 'Bills'").then(function(billTotal){
    console.log(billTotal)
    res.json(billTotal)
    });
  });
  //Get all Purchases
  app.get("/api/purchases", function(req, res) {
    db.Purchase.findAll({}).then(function(dbPurchases) {
      res.json(dbPurchases);
    });
  });
  //Get total of all purchases
  app.get("/api/purchasesTotal", function(req, res) {


  });
  // Create a new example
  app.post("/api/bills", function(req, res) {
    db.Bill.create(req.body).then(function(dbBill) {
      res.json(dbBill);
    });
  });

  //Create a new Purchase
  app.post("/api/purchases", function(req, res) {
    db.Purchase.create(req.body).then(function(dbPurchase) {
      res.json(dbPurchase);
    });
  });

  // Delete an example by id
  app.delete("/api/bills/:id", function(req, res) {
    db.Bill.destroy({ where: { id: req.params.id } }).then(function(dbBill) {
      res.json(dbBill);
    });
  });

  //Delete Purchase
  app.delete("/api/purchases/:id", function(req, res) {
    db.Purchase.destroy({ where: { id: req.params.id } }).then(function(dbPurchase) {
      res.json(dbPurchase);
    });
  });
};
