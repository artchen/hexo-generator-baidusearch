/**
 * Index Hexo posts and upload to Baidu Search
 * @param args {Object}
 */
function BaiduSearch(args) {
  var ejs = require('ejs');
  var path = require('path');
  var fs = require('fs');
  var hexoUtil = require('hexo-util');

  var hexo = this;
  var templateSrc = path.join(__dirname, '../template.ejs');
  var template = ejs.compile(fs.readFileSync(templateSrc, 'utf8'));
  var pages = args.pages.sort('-date');
  var posts = args.posts.sort('-date');
  posts = posts.data.concat(pages.data);
  posts.forEach(function(item) {
    item.baidu_title = item.title.replace('&', '&amp;');
    item.baidu_content = item.content.replace('&', '&amp;');
  });
  
  var xml = template({
    posts: posts
  });

  return {
    path: "baidusearch.xml",
    data: xml
  };
}

module.exports = BaiduSearch;