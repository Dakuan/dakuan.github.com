// load('dakuan/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("dakuan/dakuan.html","dakuan/out")
});
