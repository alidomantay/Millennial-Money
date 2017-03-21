var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;

//expense & savings schema
var expenseSchema = new schema({
  username: String,
  amount:   String,
  date:     String,
  category: String
}, {collection: 'expense'});

var savingsSchema = new schema({
  username: String,
  name:     String,
  amount:   String,
  date:     String
}, {collection: 'savings'});

var savings = mongoose.model('savings', savingsSchema);
var expense = mongoose.model('expense', expenseSchema);

//page initialization
router.get('/', auth, function(req, res, next){
  var expenseDoc = [];
  expense.find({username : req.user.username})
  .then(function(doc) {
    expenseDoc = doc;
    savings.find({username : req.user.username})
    .then(function(doc) {
      res.render('index', {username:      req.user.username,
        expenseItems:   expenseDoc,
        savingsItems:   doc,
        expenseString: JSON.stringify(expenseDoc),
        savingsString: JSON.stringify(doc)}
      );
    });
  });
});

//create expense/savings
router.post('/expense', auth, function(req, res, next){
  var data = {
    username: req.user.username,
    amount:   req.body.amount + "." + req.body.decimal,
    date:     req.body.date,
    category: req.body.category
  };
  var expenseInfo = new expense(data);
  expenseInfo.save(function(err){
    res.redirect('/');
  });
});
router.post('/savings', auth, function(req, res, next){
  var data = {
    username: req.user.username,
    name:     req.body.name,
    amount:   req.body.amount + "." + req.body.decimal,
    date:     req.body.date
  };
  var savingsInfo = new savings(data);
  savingsInfo.save(function(err){
    res.redirect('/');
  });
});

//update expense/savings
router.post('/updateExpense', auth, function(req, res, next) {
  expense.findById(req.body.id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    else {
      doc.amount    = req.body.amount + "." + req.body.decimal;
      doc.date      = req.body.date;
      doc.category  = req.body.category;
      doc.save(function(err){
        if (err) {
          console.error('update failed');
        }
        else {
          res.redirect('/');
        }
      });
    }
  });
});
router.post('/updateSavings', auth, function(req, res, next) {
  savings.findById(req.body.id, function(err, doc) {
    if (err) {
      res.redirect('/');
    }
    else {
      doc.name  = req.body.name;
      doc.amount    = req.body.amount + "." + req.body.decimal;
      doc.date      = req.body.date;
      doc.save(function(err){
        if (err) {
          console.error('update failed');
        }
        else {
          req.flash('success_msg', 'Password Changed!');
          res.redirect('/');
        }
      });
    }
  });
});

//delete expense/savings
router.post('/deleteExpense', auth, function(req, res, next) {
  var id = req.body.id;
  expense.findByIdAndRemove(id).exec(function(err){
    res.redirect('/');
  });
});
router.post('/deleteSavings', function(req, res, next) {
  var id = req.body.id;
  savings.findByIdAndRemove(id).exec(function(err){
    res.redirect('/');
  });
});

function auth(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
