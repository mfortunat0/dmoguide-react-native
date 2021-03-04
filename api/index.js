const express = require('express');
const app = express();
const fs = require('fs');

const data = require('../src/data/digimons.json');

app.use(express.json());

app.get('/digimon/:name', (req, res) => {
  const name = req.params.name;
  if (name === 'name') res.json(data.map((value) => value.name));
  else res.json(data.filter((value) => value.name === name));
});

app.get('/digimon', (req, res) => {
  res.json(data);
});

app.post('/digimon', (req, res) => {
  const {
    name,
    stage,
    attribute,
    rank,
    element,
    status,
    family,
    from,
    skills,
  } = req.body;
  if (
    name.trim().length > 0 &&
    stage.trim().length > 0 &&
    attribute.trim().length > 0 &&
    rank.trim().length > 0 &&
    element.trim().length > 0 &&
    status.length > 0 &&
    family.length > 0 &&
    from.trim().length > 0 &&
    skills.length > 0
  ) {
    if (
      !data.some((value) => value.name === name.toLowerCase().replace("'", ''))
    ) {
      data.push({
        name: name.toLowerCase().replace("'", '').trim(),
        stage: stage.toLowerCase().trim(),
        attribute: attribute.toLowerCase().trim(),
        rank: rank.toLowerCase().trim(),
        element: element.toLowerCase().trim(),
        status,
        family: family.map((value) =>
          value.toLowerCase().replace("'", '').trim(),
        ),
        from: from.toLowerCase().trim(),
        skills: skills.map((value) => {
          return {
            ...value,
            name: value.name.toLowerCase().trim(),
          };
        }),
      });
      fs.writeFileSync(
        '../src/data/digimons.json',
        JSON.stringify(data),
        'utf8',
      );
      res.json(data[data.length]);
    } else {
      res.json({error: 'digimon already registed'});
    }
  } else {
    res.json({error: 'fields incorrectly filled'});
  }
});

app.delete('/digimon/:name', (req, res) => {
  const {name} = req.params;
  const result = data.splice(
    data.findIndex((value) => value.name === name),
    1,
  );
  fs.writeFileSync('../src/data/digimons.json', JSON.stringify(data), 'utf8');
  res.json(result);
});

app.listen(3000);
