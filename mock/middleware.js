module.exports = function (req, res, next) {
  // if (req.method === "PUT" || req.method === "POST") {
  //   req.method = "GET";
  //   req.query = req.body;
  // }

  // simulate error
  // if (req.url === '/user') {
  //   return res.sendStatus(500);
  // }
  // simulate delay
  if (req.url === '/user') {
    setTimeout(() => {
      next();
    }, 2000);
  } else {
    setTimeout(() => {
      // if (req.url === '/teams') {
      //   return res.sendStatus(500);
      // }
      if (req.url === '/login') {
        if (req.body.email !== 'f1@example.com' || req.body.password !== 'f123456') {
          return res.sendStatus(401);
        }
        return res.json({
          token: 'ABC1234567890',
        });
      }
      if (req.headers.authorization !== 'ABC1234567890') {
        return res.sendStatus(401);
      }

      next();
    }, 1000);
  }
};
