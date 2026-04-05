module.exports = (req, res, next) => {
    const red = (value) => `\x1b[31m${String(value)}\x1b[0m`;
  
    console.log(`The method is: ${red(req.method)}, The url is: ${red(req.url)}`);
    next();
  };