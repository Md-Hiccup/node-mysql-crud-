
$(document).ready(function(){
    var res=0 ;
    $("#register").click(function(){
        name=$("#name").val();
        email=$("#email").val();
        pass=$("#password").val();
       // console.log(fname );
        if(name !== "" && email !== "" && pass !== ""){
            console.log("helloooo");
            $.post("/auth/register",
                {
                    name:name ,
                    email:email ,
                    password:pass
                },
                function(data){
                    console.log(data);
                    if(data.status == '200') {
                        console.log("Email is registered");
                        window.location.href = "/";
                       // location.href = "http://www.google.com";
                    }
                });
        } /* else {
            $.get("http://localhost:3000/register",function(data){
                  location.href = "http://localhost:3000/register";
            });
        }*/
    });

    $("#score").click(function(){
          user = $('#uname').val();
          game = $('#ugame').val();
          if(user !=='' && game !== ''){
            $.get("/auth/score" ,
            {
                uname : user,
                ugame : game
            },
             function(data){
               if(data.status == '200'){
                   res = data.rows;
                  alert("your Score is :"+res);
                  //window.location.href = '/result';
               } else {
                 alert('error !!!!!');
                 window.location.href = './error';
               }
        });
      }
    });

    var score = function(){
        alert("Your Score is : ",res);
    };

    $("#Upscore").click(function(){
        usr = $('#updateName').val();
        gam = $('#updateGame').val();
        upScore = $('#updateScore').val();
        alert(usr + " "+ gam + " " + upScore);
        if(usr !=='' && gam !== '' && upScore !== ''){
            $.put("/auth/updateScore" ,
                {
                    updateScore : upScore,
                    updateGame : gam,
                    updateName : usr
                },
                function(data){
                    if(data.status == '200'){
                        alert("Score is updated ");
                        //window.location.href = '/result';
                    } else {
                        alert('error !!!!!');
                        window.location.href = './error';
                    }
                });
        }
    });
    $("#del").click(function(){
        usr = $('#deleteName').val();
        if(usr !==''){
            $.delete("/auth/delete" ,
                {
                    deleteName : usr
                },
                function(data){
                    if(data.status == '200'){
                        alert("user is deleted from table ");
                        //window.location.href = '/result';
                    } else {
                        alert('error !!!!!');
                        window.location.href = './error';
                    }
                });
        }
    });
    /* $("#del").click(function(){
         usr = $('#deleteName').val();
            if(usr !==''){
            alert(usr);
            $.ajax({
                url : "/auth/delete" ,
                type : 'DELETE',
                data : { deleteName : usr},
                success : function(data){
                    if(data.status == '200'){
                        alert("user is deleted from table ");
                        //window.location.href = '/result';
                    } else {
                        alert('error !!!!!');
                            window.location.href = './error';
                            }
                         }
                 });
             }
         });*/
});
