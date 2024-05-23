
    const requireroute = require.context(".", false, /\.js$/);
    const routes = [];

    requireroute.keys().forEach(fileName => {
      if (fileName === "./index.js") return;

      routes.push(requireroute(fileName).default);
    });

    export default routes;
    