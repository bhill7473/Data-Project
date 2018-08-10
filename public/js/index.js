// Get references to page elements
var $billName = $("#bill-name");
var $billDescription = $("#bill-description");
var $billAmount = $("#bill-amount");
var $billDate = $("#bill-date");
var $submitBtn = $("#submit");
var $billList = $("#bill-list");


//Purchase Page Elements
var $purchaseName = $("#purchase-name");
var $purchaseDescription = $("#purchase-description");
var $purchasePrice = $("#purchase-price");
var $purchaseDate = $("#purchase-date");
var $pSubmitBtn = $("#submit-purchase");
var $purchaseList = $("#purchase-list");

// The API object contains methods for each kind of request we'll make
var BILLAPI = {
  saveBill: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/bills",
      data: JSON.stringify(example)
    });
  },
  getBills: function() {
    return $.ajax({
      url: "api/bills",
      type: "GET"
    });
  },
  getBillsTotal: function(){
    return $.ajax({
    url: "api/billsTotal",
    type: "GET"

  });
  },
  deleteBill: function(id) {
    return $.ajax({
      url: "api/bills/" + id,
      type: "DELETE"
    });
  }
};

var PURCHASEAPI = {

  getPurchases: function() {
    return $.ajax({
      url: "api/purchases",
      type: "GET"
    });
  },
  getPurchasesTotal: function() {
    return $.ajax({
      url: "api/purchasesTotal",
      type: "GET"
    });
  },
  savePurchase: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/purchases",
      data: JSON.stringify(example)
    });
  },
  deletePurchase: function(id) {
    return $.ajax({
      url: "api/purchases/" + id,
      type: "DELETE"
    });
  }

};

//Total of all your bills
//counter to hold total
var totalAmount = 0;
var totalBills = function(){
  BILLAPI.getBillsTotal().then(function(data){
  

  })

}

// refreshExamples gets new examples from the db and repopulates the list
var refreshBills = function() {
  BILLAPI.getBills().then(function(data) {
    var $bills = data.map(function(bill) {
      var $a = $("<a>")
        .text(bill.name)
        .attr("href", "/example/" + bill.id);

      var $p = $("<p>").text("Amount due is: $" + bill.amount);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": bill.id
        })
        .append($a).append($p);

      var $button = $("<button>")
        .addClass("btn btn-success float-right delete")
        .text("Pay Bill");

      $li.append($button);

      return $li;
    });

    $billList.empty();
    $billList.append($bills);
  });
};


//Get new Purchases from the db and repopulate the list
var refreshPurchases = function() {
  PURCHASEAPI.getPurchases().then(function(data) {
    var $purchases = data.map(function(purchase) {
      var $a = $("<a>")
        .text(purchase.name)
        .attr("href", "/purchase/" + purchase.id);

      var $p = $("<p>").text("Price of Purchase: $" + purchase.price);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": purchase.id
        })
        .append($a).append($p);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Remove Purchase");

      $li.append($button);

      return $li;
    });

    $purchaseList.empty();
    $purchaseList.append($purchases);
  });
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleBillSubmit = function(event) {
  event.preventDefault();

  var bill = {
    name: $billName.val().trim(),
    description: $billDescription.val().trim(),
    amount: $billAmount.val().trim(),
    date: $billDate.val().trim()
  };

  if (!(bill.name && bill.description && bill.amount && bill.date)) {
    alert("You must enter an example text and description!");
    return;
  }

  BILLAPI.saveBill(bill).then(function() {
    refreshBills();
  });

  $billName.val("");
  $billDescription.val("");
  $billAmount.val("");
  $billDate.val("");
};


///Submission of Purchase
var handlePurchaseSubmit = function(event) {
  event.preventDefault();

  var purchase = {
    name: $purchaseName.val().trim(),
    description: $purchaseDescription.val().trim(),
    price: $purchasePrice.val().trim(),
    date: $purchaseDate.val().trim()
  };

  if (
    !(purchase.name && purchase.description && purchase.price && purchase.date)
  ) {
    alert("You must enter an example text and description!");
    return;
  }

  PURCHASEAPI.savePurchase(purchase).then(function() {
    refreshPurchases();
  });

  $purchaseName.val("");
  $purchaseDescription.val("");
  $purchasePrice.val("");
  $purchaseDate.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBill = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  BILLAPI.deleteBill(idToDelete).then(function() {
    refreshBills();
  });
};

//Delete Purchase
var handleDeletePurchase = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  PURCHASEAPI.deletePurchase(idToDelete).then(function() {
    refreshPurchases();
  });
};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleBillSubmit);
$billList.on("click", ".delete", handleDeleteBill);

//Listeners for Purchase Page
$pSubmitBtn.on("click", handlePurchaseSubmit);
$purchaseList.on("click", ".delete", handleDeletePurchase);