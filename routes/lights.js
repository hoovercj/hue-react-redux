var express = require('express');
var router = express.Router();

router.get('/lights', function(req, res, next) {
    // GET LIGHTS
    let callback = (err, lights) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve lights'
        });
      }
      res.json(lights);
    };
});

router.post('/lights', function(req, res, next) {
  let callback = (err, light) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save light'
      });
    }
    res.json(light);
  };
});

router.get('/lights/:id', function(req, res, next) {
  let callback = (err, light) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve light w/ that id'
      });
    }
    if(!light) {
    	return res.status(404).json({message: 'Light not found'})
    }
    res.json(light);
  };
});

module.exports = router;