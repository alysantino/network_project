var express = require('express');
var path = require('path');
var fs= require('fs');
var app = express();
var readlist=[];
var readlistlogos=[];
var ki= 0;
var y=JSON.parse((fs.readFileSync("users.json")));
var currentuser=null;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  currentuser=null
  readlist=[];
  readlistlogos=[];
  ki=0;
res.render('login')
})
app.get('/home',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
res.render('home');
})

app.get('/registration',function(req,res){
 res.render('registration') 
})


app.post('/register',function(req,res){
  var userpass={username: req.body.username,password: req.body.password,readlist1: [],readlistlogos1: []};
  
  for(let i=0;i<y.length;i++){
    if(y[i].username==userpass.username){
      res.render('error');
      return;
    }
  }
  ki=y.length;
  currentuser=userpass.username;
  readlist=userpass.readlist1;
  readlistlogos=userpass.readlistlogos1;

  y.push(userpass);
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
})

app.post('/',function(req,res){
  
 
  var username1=req.body.username;
  var password1=req.body.password;
  for(let i=0;i<y.length;i++){
    if(y[i].username==username1){
      if(y[i].password==password1){
        res.render('home');
        ki=i;
        currentuser=username1;
        readlist=y[i].readlist1;
        readlistlogos=y[i].readlistlogos1;
        return;
      }
      else{
        res.render('errorpass');
        return;
      }
    }
  }
  res.render('errorno');

  
})



app.post('/search',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  
var search1=req.body.Search;
var searchlistlogos=[];
var searchlist=[];
if("Lord of the flies".includes(search1)){
  searchlist.push("Lord of the flies");
  searchlistlogos.push("flies");
}
if("The Grapes of Wrath".includes(search1)){
  searchlist.push("The Grapes of Wrath");
  searchlistlogos.push("grapes");
}
if("Leaves of Grass".includes(search1)){
  searchlist.push("Leaves of Grass");
  searchlistlogos.push("leaves");
}
if("The Sun and Her Flowers".includes(search1)){
  searchlist.push("The Sun and Her Flowers");
  searchlistlogos.push("sun");
}
if("Dune".includes(search1)){
  searchlist.push("Dune");
  searchlistlogos.push("dune");
}
if("To Kill a Mockingbird".includes(search1)){
  searchlist.push("To Kill a Mockingbird");
  searchlistlogos.push("mockingbird");
}
if(searchlist.length==0){
  res.render('noresults');
  return;
}

res.render('searchresults',{searchlistejs: searchlist,searchlistlogosejs: searchlistlogos});
})


app.get('/novel',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('novel')
  
})

app.get('/notsigned',function(req,res){
  
  res.render('notsigned')
})


app.get('/poetry',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('poetry')
})

app.get('/fiction',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('fiction')
})

app.get('/dune',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('dune')
})

app.get('/flies',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('flies')
})

app.get('/grapes',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('grapes')
})

app.get('/leaves',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('leaves')
})

app.get('/mockingbird',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('mockingbird')
})

app.get('/readlist',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('readlist', {readlistejs: readlist,readlistlogosejs: readlistlogos})
})

app.get('/searchresults',function(req,res){
  if(currentuser==null||searchlist==null){
    res.render('notsigned');
    return;
  }
  res.render('searchresults',{searchlistejs: searchlist,searchlistlogosejs: searchlistlogos})
})

app.get('/sun',function(req,res){
   
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  res.render('sun')
})

app.post('/addreadlistdune',function(req,res){
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="Dune"){
      res.render('home');
      return
    }}
  readlist.push("Dune");
  readlistlogos.push("dune");
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
})
app.post('/addreadlistflies',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="Lord of The Flies"){
      res.render('home');
      return
    }}
  readlist.push("Lord of The Flies");
  readlistlogos.push("flies");
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
 })
app.post('/addreadlistmock',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="To Kill a Mocking Bird"){
      res.render('home');
      return
    }}
readlist.push("To Kill a Mocking Bird");
readlistlogos.push("mockingbird");
fs.writeFileSync("users.json",JSON.stringify(y));
res.render('home');
})
app.post('/addreadlistgrapes',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    
    return;
  }
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="The Grapes of Wrath"){
      res.render('home');
      return
    }}
  readlist.push("The Grapes of Wrath");
  readlistlogos.push("grapes");
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
  })
app.post('/addreadlistsun',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="The Sun and Her Flower"){
      res.render('home');
      return
    }}
  readlist.push("The Sun and Her Flower");
  readlistlogos.push("sun");
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
  })
app.post('/addreadlistleaves',function(req,res){
  if(currentuser==null){
    res.render('notsigned');
    return;
  }
  for(let i=0;i<readlist.length;i++){
    if(readlist[i]=="Leaves of Grass"){
      res.render('home');
      return
    }}
  readlist.push("Leaves of Grass");
  readlistlogos.push("leaves");
  fs.writeFileSync("users.json",JSON.stringify(y));
  res.render('home');
  })


app.listen(3000);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
