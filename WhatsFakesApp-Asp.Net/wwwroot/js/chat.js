﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

//Disable send button until connection is established
//document.getElementById("sendButton").disabled = /*true*/;

connection.on("ReceiveMessage", function (user, message) {
    console.log("message received")

    var ul = document.createElement("ul");
    ul.classList = "receiver msg";

    var li = document.createElement("li");

    var p = document.createElement("p");
    p.innerHTML = message;

    var span = document.createElement("ul");
    span.innerHTML = "12:02";

    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);

    console.log(ul);

    document.getElementById("chat-messages-container").appendChild(ul);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("send-message-btn").addEventListener("click", function (event) {
    var message = document.getElementById("message-input").value;
    console.log("message : " + message);
    //var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", message).catch(function (err) {
        return console.error(err.toString());
    });
    console.log("message sended")
    event.preventDefault();
});