/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function displayForm(id){ //sets the form with this id to be visible and the other one invisible
    if(id === 'signup'){
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "block";        
        document.getElementById("toggleMessage").setAttribute("onclick","displayForm('signin')");
        document.getElementById("toggleMessage").innerHTML = "Already have an account? Sign in.";
        
    }else{
        document.getElementById("signup").style.display = "none";
        document.getElementById("signin").style.display = "block";        
        document.getElementById("toggleMessage").setAttribute("onclick","displayForm('signup')");
        document.getElementById("toggleMessage").innerHTML = "Don't have an account? Sign Up.";
    }
}

function changeColor(){
    document.getElementById("signin").style.backgroundColor = "red";
}