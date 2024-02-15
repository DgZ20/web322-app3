/********************************************************************************* 
 * WEB322 – Assignment 02
 * *
 * * I declare that this assignment is my own work in accordance with Seneca's
 * * Academic Integrity Policy:
 * *
 * * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 * *
 * * Name: __________Karl Andrei Diola____________ Student ID: ____146937222__________ Date: ______________
 * *
 * * Published URL: ____________________https://lovely-pumps-frog.cyclic.app_______________________________________
 * *********************************************************************************/

const legoData = require("./modules/legoSets");
const path = require('path');

const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});


app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
  
    if (theme) {
      legoData.getSetsByTheme(theme).then((data) => {
        res.json(data);
      }).catch((err) => {
        res.status(404).send(`404 - ${err}`)
      });
    } else {
      legoData.getAllSets().then((data) => {
        res.json(data);
      }).catch((err) => {
        res.status(404).send(`404 - ${err}`)
      });
    }
  });

// app.get("/lego/sets/num-demo", async (req, res) => {
//     try {
//         let set = await legoData.getSetByNum("001-1");
//         res.send(set);
//     }catch {
//         res.send(err);
//     }
// });

app.get('/lego/sets/:id', (req, res) => {
    const setNum = req.params.id;
  
    legoData.getSetByNum(setNum).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  });

  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
  });

// app.get("/lego/sets/theme-demo", async (req,res)=>{
//     try{
//       let sets = await legoData.getSetsByTheme("tech");
//       res.send(sets);
//     }catch(err){
//       res.send(err);
//     }
// });
  
legoData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
});