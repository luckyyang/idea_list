Ideas = new Mongo.Collection("ideas");
// all_ideas = Ideas.find();
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault("up_counter", 2);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    all_ideas: function () {
      return Ideas.find({}, {sort: {score: -1}});
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
    },
    'click li': function () {
      Session.set('up_counter', Session.get('up_counter') - 1);
      if(Session.get('up_counter') >= 0){
        Ideas.update(this._id, {$inc: {score: 1}}); //primary id, $inc:increase
      }
    }
  });
  Template.form.events({
    'click button': function(event) {
      event.preventDefault();
      var idea_name = $("input[type=text]").val();
      Ideas.insert({
        name: idea_name,
        score: 0
      });
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Ideas.remove({});
    // code to run on server at startup
    if(Ideas.find().count() == 0) {
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
    }
  });
}

console.log("not in both client and server");
