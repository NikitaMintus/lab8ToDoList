var express = require('express');
var bodyParser = require('body-parser');
var nedb = require('nedb');

var db = new nedb({ filename: './backend/db.nedb', autoload: true });
var app = express();
var apiRouter = express.Router();

apiRouter.use(bodyParser.json());

if (process.argv.indexOf('simulate-errors') != -1) {
  apiRouter.use(function(req, res, next) {
    if(Math.random() < 0.5) {
      res.sendStatus(503);
    } else {
      next();
    }
  });
}

apiRouter.get('/', function(req, res, next) {
  db.find({}, function(err, docs) {
    if(err) return next(err);

    res.json(docs);
  });
});

apiRouter.post('/', function(req, res, next) {
  var todo = {
    text: req.body.text,
    completed: req.body.completed || false
  };

  if((typeof todo.text != 'string') || (typeof todo.completed != 'boolean')) {
    return res.sendStatus(400);
  }

  db.insert(todo, function(err, doc) {
    if(err) return next(err);

    res.json(doc);
  });
});

apiRouter.delete('/', function(req, res, next) {
  db.remove({}, { multi: true }, function(err, numRemoved) {
    if(err) return next(err);

    res.sendStatus(204);
  });
});

apiRouter.delete('/completed', function(req, res, next) {
  db.remove({ completed: true }, { multi: true }, function(err, numRemoved) {
    if(err) return next(err);

    res.sendStatus(204);
  });
});

apiRouter.get('/:id', function(req, res, next) {
  db.findOne({ _id: req.params.id }, function(err, doc) {
    if(err) return next(err);

    if(doc) {
      res.json(doc);
    } else {
      res.sendStatus(404);
    }
  });
});

apiRouter.patch('/:id', function(req, res, next) {
  var delta = {};

  if(typeof req.body.text != 'undefined') {
    if(typeof req.body.text == 'string') {
      delta.text = req.body.text;
    } else {
      res.sendStatus(401);
    }
  }

  if(typeof req.body.completed != 'undefined') {
    if(typeof req.body.completed == 'boolean') {
      delta.completed = req.body.completed;
    } else {
      res.sendStatus(400);
    }
  }

  db.update({ _id: req.params.id }, { $set: delta }, {}, function(err, numUpdated) {
    if(err) return next(err);

    if(numUpdated > 0) {
      db.findOne({ _id: req.params.id }, function(err, doc) {
        if(err) return next(err);

        res.json(doc);
      });
    } else {
      res.sendStatus(404);
    }
  });
});

apiRouter.delete('/:id', function(req, res, next) {
  db.remove({ _id: req.params.id }, {}, function(err, numRemoved) {
    if(err) return next(err);

    if(numRemoved > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

app.use('/todos', apiRouter);
app.use(express.static('frontend'));
app.use(function(err, req, res, next) {
  console.log(err);
  res.sendStatus(500);
});

var server = app.listen(3000, function() {
  var addr = server.address();
  console.log('Listening at http://%s:%s', addr.address, addr.port);
});
