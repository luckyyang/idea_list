Ideas = new Mongo.Collection("ideas");
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    abc: function () {
      Ideas.findOne().score;
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      console.log("click hello template");
      Session.set('counter', Session.get('counter') + 1);
      Ideas.insert({
        score: Session.get('counter')
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var names = [
    "8小时做一个 facebook",
    "8小时做一个 twitter",
    "8小时做一个 知乎"
    ];
    _.each(names,function(name) { //underscorejs.org, javascipt
      Ideas.insert({
        name: name,
        score: 0
      })
    })
  });
}

console.log("not in both client and server");
