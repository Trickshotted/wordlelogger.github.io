var faunadb = window.faunadb
  var q = faunadb.query
  var client = new faunadb.Client({
    secret: 'fnAEe7Q8R7AAyAXojyYP-C8GTe93d7MYG62NQrJ8',
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  })


  function checkLoggedIn(){
    if(localStorage.getItem("WordleLoggerUser") == null)
    {
        document.getElementById("loggedIn").innerText = "Not Logged In!"
    }
    else{
        client.query(
            q.Get(
              q.Match(q.Index('info_from_user'), localStorage.getItem("WordleLoggerUser"))
            )
          )
          .then(function(ret) {
             
            document.getElementById("loggedIn").innerHTML = "<img style=\"border-radius:50%; width:40px; height:40px; vertical-align:middle\" onerror=\"this.src='https://www.powerlanguage.co.uk/wordle/images/wordle_logo_32x32.png'\" src=\"" + ret.data.pfp + "\"><label style=\"margin-left:10px; float:right; vertical-align:middle\"><b>" + ret.data.username + "</b><br><i style=\"color:#b59f3b\" class=\"fas fa-puzzle-piece\"></i><label style=\"margin-left:5px;\">" + ret.data.puzzles.toString() + "</label></label><br><button onclick=\"logOut()\" class=\"logOutButton\">Log Out</button>" 
              
              
          })
          .catch(function(e){
             document.getElementById("loggedIn").innerText = "Unable to retrieve user info."
          });
    }

  }

  function signUp(){


    client.query(
  q.Get(
    q.Match(q.Index('info_from_user'), document.getElementById("username").value)
  )
)
.then(function(ret){ 
     
alert("This name is taken!")

})
  
.catch(function(e){



  let date = new Date();
    client.query(
  q.Create(
    q.Collection('users'),
    { data: { username: document.getElementById("username").value.replace(/\s/g, "-"), pfp: "https://dummyimage.com/1000/3d64a8/141414&text=" + document.getElementById("username").value.replace(/\s/g, "-"), puzzles: 0, password: document.getElementById("password").value, saved_games: [], account_created: date.toUTCString()} },
  )
)
.then(function(ret){

     
    localStorage.setItem('WordleLoggerUser', ret.data.username);
    redirect("dashboard.html")
    })

});

  }


  function checkIfLoggedIn(){
    if(localStorage.getItem("WordleLoggerUser") == null)
    {
        
    }
    else{
        
        redirect("dashboard.html")
    }


  }

  function logIn(){
    client.query(
        q.Get(
          q.Match(q.Index('info_from_user'), document.getElementById("username").value)
        )
      )
            
      .then(function(ret) {
                            
        if(ret.data.password != document.getElementById("password").value)  
        {
          alert("User and password do not match!")
        }
        else{
         
          localStorage.setItem('WordleLoggerUser', ret.data.username);
          redirect("dashboard.html")
        }
      })
      .catch(function(e){
        alert("User not found.")
      });



  }

  function logOut(){
    localStorage.removeItem("WordleLoggerUser")
    window.location.reload()
  }

  function getInfo(){

    client.query(
        q.Get(
          q.Match(q.Index('info_from_user'), localStorage.getItem("WordleLoggerUser"))
        )
      )
      .then(function(ret) {
         
        document.getElementById("pfp").src = ret.data.pfp
        document.getElementById("username").innerHTML = "<b>" + ret.data.username + "</b>"
        document.getElementById("info").innerHTML = "Games Saved: <b>" + ret.data.puzzles + "</b><br>Account Created: <b>" + ret.data.account_created + "</b>" 
          
      })
      .catch(function(e){

      });

  }


  function logOutSetting(){
    localStorage.removeItem("WordleLoggerUser")
    redirect("index.html")
  }

  

