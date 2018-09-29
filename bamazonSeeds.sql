DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INT (10),
    stock_quantity INT (10),
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "accessories", 50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("red lipstick", "beauty", 25, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebook", "stationary", 1, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pen", "stationary", 2, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 5, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pink lipstick", "beauty", 25, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 75, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vinyl record", "music", 30, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("scrunchie", "accessories", 5, 10);