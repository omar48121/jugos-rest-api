create database if not exists jugosnaty_strongmine;

create table products (
    id int(11) not null auto_increment,
    name varchar(45) not null,
    price int(5) not null,
    description varchar(100) not null,
    imageUrl varchar(200) default null,
    primary key (id)
);

insert into employee values
    (1, 'omar', 8000),
    (2, 'edgar', 5000),
    (3, 'eder', 3500)

CREATE TABLE users (
    userId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(45) NOT NULL,
    password VARCHAR(100) NOT NULL
);
