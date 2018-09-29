var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "R1chmond!",
  database: "bamazon"
})

function start(){
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
  
    console.log("Welcome to Bamazon!")
    console.log("----------------------------------------------------------------------------------------------------")
  
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + "  | quantity: " + res[i].stock_quantity);
      console.log("----------------------------------------------------------------------------------------------------")
    }
  
    console.log("");
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        validate: function(value){
          if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
            return true;
          } else{
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How much would you like to purchase?",
        validate: function(value){
          if(isNaN(value)){
            return false;
          } else{
            return true;
          }
        }
      }
      ]).then(function(ans){
        var whatToBuy = (ans.id)-1;
        var howMuchToBuy = parseInt(ans.qty);
        var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
  
        if(res[whatToBuy].stock_quantity >= howMuchToBuy){
          connection.query("UPDATE products SET ? WHERE ?", [
          {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
          {id: ans.id}
          ], function(err, result){
              if(err) throw err;
              console.log("Your total is $" + grandTotal.toFixed(2));
          });
  
          connection.query("SELECT * FROM department", function(err, deptRes){
            if(err) throw err;
            var index;
            for(var i = 0; i < deptRes.length; i++){
              if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
                index = i;
              }
            }
            
            //updates totalSales in departments table
            connection.query("UPDATE Departments SET ? WHERE ?", [
            {TotalSales: deptRes[index].TotalSales + grandTotal},
            {DepartmentName: res[whatToBuy].DepartmentName}
            ], function(err, deptRes){
                if(err) throw err;
                //console.log("Updated Dept Sales.");
            });
          });
  
        } else{
          console.log("Sorry, there's not enough in stock!");
        }
  
        reprompt();
      })
  })
  }
  
  //asks if they would like to purchase another item
  function reprompt(){
    inquirer.prompt([{
      type: "message",
      name: "reply",
      message: "Yay!"
    }]).then(function(ans){
      if(ans.reply){
        start();
      } else{
        console.log("See you soon!");
      }
    });
  }
  
  start();