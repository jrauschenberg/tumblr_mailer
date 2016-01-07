var tumblr = require('tumblr.js');
var fs = require('fs');
var ejs = require('ejs');

var client = tumblr.createClient({
  consumer_key: 'zs78RokhfBMSoNVwx4MNhRZZdQiU2wjBwqjILp85eXh3OKOGbR',
  consumer_secret: 'VXqkxyPSpRUpMkRJqYRfVrK8DomDKwgMzUGOvhtOcUoH4XORcY',
  token: 'vDSe2zUP6Nzw8PMz2hcM8eWY0aTp9j2pFc784vwG6x8Ghz6vI8',
  token_secret: '8vQMA2QEXcyg5rXiLSAPzuztTAQHh28efOUcnZHCh9R3IIPHAE'
});


var latestPosts = [];
client.posts('attempt101c.tumblr.com', function(err, blog){
  for (var i=0; i<blog.posts.length; i++) {
    if (blog.posts[i].timestamp) {
      latestPosts.push(blog.posts[i] + 604800 > Date.now/1000);
      
    }
  }
})
console.log(latestPosts);