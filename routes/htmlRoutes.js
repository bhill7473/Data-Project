var db = require("../models");

module.exports = function(app) {
//Load Purchases
app.get("/", function(req, res) {
  db.Purchase.findAll({}).then(function(dbPurchases) {
    res.render("PurchaseIndex", {
      msg: "Welcome{USER NAME}! Here are your purchases",
      purchases: dbPurchases
    });
  });
});

//Load Purchase Page
app.get("/purchase/:id", function(req, res) {
  db.Purchase.findOne({ where: { id: req.params.id } }).then(function(dbPurchase) {
    res.render("purchase", {
      purchase: dbPurchase
    });
  });
});


  // Load example page
  app.get("/bill", function(req, res) {
    db.Bill.findAll({}).then(function(dbBills) {
      res.render("billIndex", {
        msg: "Welcome{USER NAME}! here are your bills",
        bills: dbBills
      });
    });
  });
  // Load example page and pass in an example by id
  app.get("/bill/:id", function(req, res) {
    db.Bill.findOne({ where: { id: req.params.id } }).then(function(dbBills) {
      res.render("bill", {
       bill: dbBills
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
