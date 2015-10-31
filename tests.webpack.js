// require all `test/components/**/index.js`
const testsContext = require.context('./tests/', true, /Test\.js$/);

testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
const componentsContext = require.context('./src/js/', true, /\.js$/);

var componentsContextKeys = componentsContext.keys();

//Delete files we don't want/need
delete componentsContextKeys[componentsContextKeys.indexOf('./app.js')];
delete componentsContextKeys[componentsContextKeys.indexOf('./bootstrap.min.js')];

componentsContextKeys.forEach(componentsContext);