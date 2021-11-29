const { CompaniesHouseAPI } = require('companies-house-uk');
const https= require("https")
const express=require("express")
const cors=require('cors')
const bp = require('body-parser')

const session = require('express-session');

const ch = new CompaniesHouseAPI('65df0545-c174-478f-9383-7ae88582947d');
const app=express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

app.use(session({
	secret: 'something crazy',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
}));

app.post('/', async (req, res) => {
  const { item } = req.body;
  console.log(item)
  ch.search(item).then(({ body }) => {
    console.log(body);
    res.send(body.items)
    // body.items.map((item)=>{
    //   res.send(item.title)
    // })
    
})
.catch((error) => {
    console.log(error);
});
});


app.listen(process.env.PORT||8000,function(){
  console.log('server is runing on port 8000')
})
