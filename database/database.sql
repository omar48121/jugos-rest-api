create database if not exists jugosnaty_strongmine;

create table employee (
    id int(11) not null auto_increment,
    name varchar(45) default null,
    salary int(5) default null,
    primary key (id)
)

insert into employee values
    (1, 'omar', 8000),
    (2, 'edgar', 5000),
    (3, 'eder', 3500)