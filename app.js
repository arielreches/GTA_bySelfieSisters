
var app = new Vue({
  el: '#app',
  data: {
    message: 'This is Matts app, go away!'
  }
})

/*













*/
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'Quinn loaded this page on ' + new Date().toLocaleString()
  }
})
/*













*/
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
/*













*/
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
/*













*/
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
/*













*/

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Selfie Sister!!'
  }
})

/*













*/

Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})


var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' },
      { id: 3, text: 'Fourth item.' }
    ]
  }
})
/*













*/

var app8 = new Vue({

    // A DOM element to mount our view model.
    el: '#app-8',

    // This is the model.
    // Define properties and give them initial values.
    data: {
        active: 'home'
    },

    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        }
    }
});
/*













*/


var app9 = new Vue({
    el: '#app-9',
    data: {
        searchString: "",

        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity.

        articles: [
            {
                "title": "What You Need To Know About CSS Variables",
                "url": "https://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/",
            },
            {
                "title": "Freebie: 4 Great Looking Pricing Tables",
                "url": "https://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/",
            },
            {
                "title": "20 Interesting JavaScript and CSS Libraries for February 2016",
                "url": "https://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/",
            },
            {
                "title": "Quick Tip: The Easiest Way To Make Responsive Headers",
                "url": "https://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
            },
            {
                "title": "Learn SQL In 20 Minutes",
                "url": "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
            },
            {
                "title": "Creating Your First Desktop App With HTML, JS and Electron",
                "url": "https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
            }
        ]
    },
    computed: {
        // A computed property that holds only those articles that match the searchString.
        filteredArticles: function () {
            var articles_array = this.articles,
                searchString = this.searchString;

            if(!searchString){
                return articles_array;
            }

            searchString = searchString.trim().toUpperCase();

            articles_array = articles_array.filter(function(item){
                if(item.title.toUpperCase().indexOf(searchString) !== -1){
                    return item;
                }
            })

            // Return an array with the filtered data.
            return articles_array;;
        }
    }
});


// Define a custom filter called "currency". 
Vue.filter('currency', function (value) {
    return '$' + value.toFixed(2);
});


/*













*/
var app10 = new Vue({
    el: '#app-10',
    data: {
        // Define the model properties. The view will loop
        // through the services array and genreate a li
        // element for every one of its items.
        services: [
            {
                name: 'Web Development',
                price: 300,
                active:true
            },{
                name: 'Design',
                price: 400,
                active:false
            },{
                name: 'Integration',
                price: 250,
                active:false
            },{
                name: 'Training',
                price: 220,
                active:false
            }
        ]
    },
    methods: {
        toggleActive: function(s){
            s.active = !s.active;
        },
        total: function(){

            var total = 0;

            this.services.forEach(function(s){
                if (s.active){
                    total+= s.price;
                }
            });

           return total;
        }
    }
});
