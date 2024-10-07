const express=require("express");
const app=express();
const path=require("path");



app.set("view.engine","ejs");//these are needed to show the flash messages
app.set("views",path.join(__dirname,"views"));

const session=require("express-session");//npm i express-session
const flash=require("connect-flash");//npm i connect-flash



const sessionoptions={
    secret:"mysupersecretstring",resave:false,saveUninitialized:true
}

app.use(session(sessionoptions));//secret is necessary.saveunitialised means jo session initialised vi ni hua woh save hoje store mien.server unitialised tab hota jab woh new ha but modified ni.resave means forcing the session to be saved back to the ession store even if the session was never modified.different type of stores hote
app.use(flash());

app.use((req,res,next)=>{
    res.locals.msg=req.flash("success");
    res.locals.err=req.flash("error");
    next();

})
//connect.sid  cookie ban jege apne liye jo ke session ke id bata ri
/*
app.get("/recount",(req,res)=>{//session same rehta bs requests badti rehte
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.count} times`);
});
/*app.get("/test",(req,res)=>{
    res.send("test successful");
});*/

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
   // console.log(req.session);//isme kuch variables hote but hum khud se vi varuiables bana skte jese req.ession.count banaya tha.but aur banayenge ab.
    req.session.name=name;//ek aur variable bana dia req.session mein matlab req ke session mwein. ab hum isko kisi vi route sah use kr skte not necessaryu ke sirf is route mein.
    console.log(req.session.name);
    //res.send(name);
    if(name==="anonymous"){
        req.flash("error","user not registered");
    }
    else{
        req.flash('success','user registered successfully');// before redirecting we want to flash a message. it should have two things sin it. one is key that is success here and the message we want to have.
    }
   
    
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
   
   res.render("page.ejs",{name:req.session.name})//,msg:req.flash('success')});//we will send flash message here together with name. page.ejs mein isko jagah dedena.Also jo hum yeh sath mein specially msg send kr re with res.render to render with page we can actually use those variables by defininf them with res.locals jis se woh variables apne aap use hojate template mein.
    //res.send(`hello,${req.session.name}`);//idhar vi chlega
})

app.listen(3000,()=>{
    console.log("server is listening");
})
//jese he refresh krenge woh hat jega message flash wala.