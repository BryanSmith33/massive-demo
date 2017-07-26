const express = require('express');
const bodyParser = require('body-parser');
const React = require('react');
const {renderToString} = require('react-dom/server');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');

  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  });
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;

  if(state){
    db.getIncidentsByState([state]).then(incidents => (
      res.send(incidents)
    ));
  }else{
    db.getAllIncidents().then(incidents => (
      res.send(incidents)
    ));
  }
});

app.post('/incidents', (req, res) => {
  const db = req.app.get('db');
  const incident = req.body;

  db.createIncident([incident.state, incident.causeid, incident.injuryid]).then(results =>(
    res.send(results[0])
  ))
});

massive(YOUR_CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log('Magic is happening on', port);
  });
});
