const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');

app.set("views", path.join(__dirname , "views"));
app.set("view engine" , 'ejs');

app.use(express.static('./public'));
app.get('/', (req, res)=> {
   res.render("index");
}); 


// Copy from Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
  var upload = multer
  ({ storage: storage }).single("profilepic");
// HERE I USE .single("The """""name""""" that i have given on the <input type="file">)


// This is a post route

app.post('/upload', (req, res)=>{
    upload(req, res, (error) => {
          if(error){
              res.render('index', {
                  message: error
              })
          } else{
              res.render('index' ,{
                  message: "Successfully uploaded",
                  filename: `myupload/${req.file.filename}`
              });
          }
    });
});













app.listen(3000 , ()=> { 
    console.log("App is serving here ....");
});