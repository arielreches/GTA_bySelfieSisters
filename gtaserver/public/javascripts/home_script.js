var nav = new Vue({
    el: "#nav",

    data:{

        tagName:"companyName",

        searchString: '',

        otherString: '',

        tagList:[
            {
                name:"companyName"
            },
            {
                name:"systemName"
            },
            {
                name:"serialNumber"
            },
            {
                name:"productFamily"
            },
            {
                name:"model"
            },
            {
                name:"osVersion"
            },
            {
                name:"patches"
            },
            {
                name:"cpgCount"
            }
        ],
        articles: [
            {
                "companyName":"Arkon",
                "systemName":"Everyman",
                "serialNumber":"1",
                "productFamily":"7000",
                "model":"7400",
                "osVersion":"3.2.2.530 (MU3)",
                "patches":"P39",
                "cpgCount":"81",

            },
            {
                "companyName":"Sigyn",
                "systemName":"Jarella",
                "serialNumber":"2",
                "productFamily":"7000",
                "model":"7200",
                "osVersion":"3.2.2.390 (MU2)",
                "patches":"P11:P14:P15",
                "cpgCount":"6",

            },
            {
                "companyName":"Scarlet Beetle",
                "systemName":"Thunderfist",
                "serialNumber":"3",
                "productFamily":"7000",
                "model":"7400",
                "osVersion":"3.2.2.390 (MU2)",
                "patches":"P11:P14:P15:P19:P22:P24",
                "cpgCount":"3",

            },
            {
                "companyName":"Karima Shapanda",
                "systemName":"Wyatt Wingfoot",
                "serialNumber":"4",
                "productFamily":"7000",
                "model":"7200c",
                "osVersion":"3.2.2.612 (MU4)",
                "patches":"P56:P59:P74:P84:P85:P90",
                "cpgCount":"21",

            },
            {
                "companyName":"Ghost Dancer",
                "systemName":"Jared Corbo",
                "serialNumber":"5",
                "productFamily":"8000",
                "model":"8440",
                "osVersion":"3.2.2.612 (MU4)",
                "patches":"P51:P56:P58:P59:P60:P73:P80",
                "cpgCount":"9",

            },
            {
                "companyName":"Max",
                "systemName":"Contrary",
                "serialNumber":"6",
                "productFamily":"7000",
                "model":"7200c",
                "osVersion":"3.2.2.390 (MU2)",
                "patches":"P11:P14:P15:P19:P20:P38:P46",
                "cpgCount":"18",

            }
        ]
    },
    computed: {
        // A computed property that holds only those articles that match the searchString.
        filteredArticles: function () {
            var articles_array = this.articles;
            var searchString = this.searchString;

            var tag = this.tagName;
            console.log(tag);

            if(!searchString){
                return articles_array;
            }
            else {
                searchString = searchString.trim().toLowerCase();
                articles_array = articles_array.filter(
                    function (item) {
                        if (item[tag].toLowerCase().indexOf(searchString) !== -1) {
                            return item;
                        }
                    }
                )
            }
            // Return an array with the filtered data.
            return articles_array;
        }
    },
    methods: {
        makeActive: function (item) {
            this.tagName = item;
            var form = document.getElementById("inputForm");
            form.reset();
            this.searchString='';
        },
    }
});