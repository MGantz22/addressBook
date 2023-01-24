// User Interface Logic

window.onload = function() {
  let addBook = new AddressBook();
  let form = document.querySelector("form");

  form.onsubmit = function(event) {
    event.preventDefault()
    let fname = document.getElementById("fName").value;
    let lname = document.getElementById("lName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let contact = new Contact(fname, lname, phoneNumber);
    if(Object.keys(addBook.contacts).includes(fname)) {
      if(addBook.contacts[fname].lastName === lname) {
        addBook.contacts[fname].update(fname, lname, phoneNumber)
      } else {
        addBook.addContact(contact)
      }
    } else {
      addBook.addContact(contact)
    }

    let listSpot = document.getElementById("list");
    let recentSpot = document.getElementById("recent");
    recentSpot.innerText ="";
    recentSpot.append(objectToUL(contact))
    listSpot.innerText = "";
    listSpot.append(objectToUL(addBook.contacts))
  }
}

function objectToUL(object) {
  let parentUL = document.createElement("ul")
  Object.keys(object).forEach(function(object1) {
    let li = document.createElement("li");
    li.innerText = object1;
    parentUL.append(li)
    if(Object.keys(object[object1]).length > 0) {
      let li2 = document.createElement("li");
      li2.innerText = object
      let innerUL = document.createElement("ul");
      Object.keys(object[object1]).forEach(function(object2) {
        let li3 = document.createElement("li");
        li3.innerText=object2 + ": " + object[object1][object2];
        innerUL.append(li3)
        if(Object.keys(object[object1][object2]).length > 0) {
          let li4 = document.createElement("li");
          let innerUL2 = document.createElement("ul");
          Object.keys(object[object1][object2]).forEach(function(object3) {
            let li5 = document.createElement("li");
            li5.innerText = object3 + ": " + object[object1][object2][object3];
            innerUL2.append(li5)
          })
          li4.append(innerUL2)
          innerUL.append(li4)
        }
      })
      li2.append(innerUL)
      parentUL.append(li2)
    }
  })
  return parentUL;
}

// Business Logic for AddressBook

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.update = function(newFirstName, newLastName, newPhoneNumber) {
  if(newFirstName !== undefined && newFirstName !== "") {
    this.firstName = newFirstName;
  }
  if(newLastName !== undefined && newLastName !== "") {
    this.lastName = newLastName;
  }
  if(phoneNumber !== undefined) {
    this.phoneNumber = phoneNumber;
  }
}

