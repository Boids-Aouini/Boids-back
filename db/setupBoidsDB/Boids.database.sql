CREATE DATABASE Boids;

USE Boids;

CREATE TABLE Users (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    firstname varchar(30) NOT NULL,
    lastname varchar(30) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    birthDate Date,
    longitude int,
    latitude int,
    heighAccuracy int,
    updatedAt Date,
    createdAt Date,
    PRIMARY KEY (id)
);

CREATE TABLE Servers (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    leader_id int NOT NULL,
    name varchar(50) NOT NULL,
    createdAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (leader_id) REFERENCES Users(id)
);

CREATE TABLE Servers_Members (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    server_id int NOT NULL,
    user_id int NOT NULL
)

CREATE TABLE Channels (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    server_id int NOT NULL,
    name varchar(20) NOT NULL,
    createdAt DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (server_id) REFERENCES Servers(id)
);

CREATE TABLE Channels_Posts (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    channel_id int NOT NULL,
    user_id int NOT NULL,
    post varchar(250) NOT NULL,
    isHidden BOOLEAN,
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (channel_id) REFERENCES Channels(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Posts_Comments (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    user_id int NOT NULL,
    post_id int NOT NULL,
    post int NOT NULL,
    comment varchar(250),
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (post_id) REFERENCES Channels_Posts(id)
);

CREATE TABLE Direct_Messages (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    receiver_id int NOT NULL,
    sender_id int NOT NULL,
    message varchar(250) NOT NULL,
    createdAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (receiver_id) REFERENCES Users (id),
    FOREIGN KEY (sender_id) REFERENCES Users (id)
);