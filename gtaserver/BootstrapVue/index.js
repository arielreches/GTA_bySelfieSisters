/*used as default display on the index page*/
Vue.component('disp', {
    template: '<form id="signin" action="/signin" method="POST"><div class="form-group"><label for="exampleInputEmail1">Username</label><input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username"><br/><label for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"></div><button type="submit" class="btn btn-primary" id = "sbbutton">Sign In</button> <br/><br/></form>'
})

/*make the vue instance*/
new Vue ({
    el: '#index',
    data: {
        title: "Sign In To Your Account",
    },
    methods: {
        setSignUp: function(){
            this.title = "Sign Up",
            Vue.component('disp', { /*redefine the display for the page*/
                template: '<form id="signup" action="/signup" method="POST"><div class="form-group"><label for="exampleInputEmail1">Desired Username</label><input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username"><br/><label for="exampleInputPassword1">Desired Password</label><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"></div><button type="submit" class="btn btn-primary">Sign Up</button> <br/><br/></form>'
            })
        },
        setSignIn: function(){
            this.title = "Sign In To Your Account",
            Vue.component('disp', { /*redefine the display for the page*/
                template: '<form id="signin" action="/signin" method="POST"><div class="form-group"><label for="exampleInputEmail1">Username</label><input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username"><br/><label for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"></div><button type="submit" class="btn btn-primary">Sign In</button> <br/><br/></form>'
            })
        },
        about: function(){
            this.title = "About the Graphical Tagging Application",
            Vue.component('disp', { /*redefine the display for the page*/
                template: '<p>The GTA is a tagging system meant to be used by HPE for organizing systems</p>'
            })
        }
    }
    }
)
