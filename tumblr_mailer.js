var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");

var csvParse = function(data) {
  var arrofobjects = [];
  var lines = data.split("\n");

  for (var i=1; i<lines.length-1; i++) {
    var info = lines[i].split(",");
    arrofobjects[i-1] = {};
    arrofobjects[i-1]['firstName'] = info[0];
    arrofobjects[i-1]['lastName'] = info[1];
    arrofobjects[i-1]['numMonthsSinceContact'] = info[2];
    arrofobjects[i-1]['emailAddress'] = info[3];
  };
  console.log(arrofobjects);
  return arrofobjects;
}

var friendlist = csvParse(csvFile);

// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'zs78RokhfBMSoNVwx4MNhRZZdQiU2wjBwqjILp85eXh3OKOGbR',
  consumer_secret: 'VXqkxyPSpRUpMkRJqYRfVrK8DomDKwgMzUGOvhtOcUoH4XORcY',
  token: 'vDSe2zUP6Nzw8PMz2hcM8eWY0aTp9j2pFc784vwG6x8Ghz6vI8',
  token_secret: '8vQMA2QEXcyg5rXiLSAPzuztTAQHh28efOUcnZHCh9R3IIPHAE'
});

var emailTemplate = fs.readFileSync('email_template.ejs', 'utf8');

//getting all first names
/*function firstget() {
  var names = [];
  for (var i=0; i<friendlist.length; i++) {
    names.push(friendlist[i].firstName);
  }
  return names;
}

var firstName = firstget();

//getting all numMonthsSinceContact
/*function contactget() {
  var contact = [];
  for (var i=0; i<friendlist.length; i++) {
    contact.push(friendlist[i].numMonthsSinceContact);
  }
  return contact;
}*/

var firstName, numMonthsSinceContact;

var personalizer = function() {
  var templateCopy = emailTemplate;
  for (var k=0; k<friendlist.length; k++) {
    firstName = friendlist[k]['firstName']
    numMonthsSinceContact = friendlist[k]["numMonthsSinceContact"];
    client.posts('attempt101c.tumblr.com', function(err, blog){
    var latestPosts = [];
    for (var j=0; j<blog.posts.length; j++) {
      if (blog.posts[j].timestamp  + 604800 > Date.now()/1000) {
        latestPosts.push(blog.posts[j]);
      }
    }
    console.log(ejs.render(emailTemplate, {
    firstName: firstName,
    numMonthsSinceContact: numMonthsSinceContact,
    latestPosts: latestPosts
    }));
    
  })

  }
};

personalizer();
