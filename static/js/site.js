// Made global variables to get access to the results from the google api
const bus = new Vue();

let lastSearch = [];

function handleSearch(result) {
  if (!result) return;
  lastSearch = result;
  console.log('search', result);
}

bus.$on('search', handleSearch);


const account = {
  template: $("#account").html(),
  created() {
    this.getAccountInfo();
  }
};

const login = {
  template: $("#login").html(),
  methods: {
    needAccount: function() {
      router.push({
        path: 'signup',
        component: signup
      });
    }
  },
  created() {
    this.getlogin();
  }
};

const homepage = {
  template: $("#homepage").html(),
  methods: {
    searching: function() {
      router.push({
        path: 'search',
        component: search
      });
    }
  },
};

const search = {
  template: $("#search").html(),
  data() {
    return {
      results: [],
      selected: undefined,
      searchString: undefined,
    };
  },
  methods: {
    handleClick: function(event, results) {
        if (event) {
          router.push({
            path: 'zoomedInfo/' + results.id,
            component: zoomedInfo,
            props: {
              'id': results.id
            }
          })
        }
      },
    sortName: function () {
      this.$data.results.sort(this.sortResults);
    },
    sortRating: function () {
      this.$data.results.sort(this.sortResults);
    },
    sortResults: function (a,b) {
      var sortCondition = $("#sorter").val();
      if (a[sortCondition] < b[sortCondition])
        return -1;
      if (a[sortCondition] > b[sortCondition])
        return 1;
      return 0;
    },
    handleSearch: function (results) {
      console.log("SECOND ONE");
      this.$data.results = results;
      console.log('search', results);
    }
  },
  computed: {
    // Filters search list as you enter a new value
    filteredList() {

      var searchString = $(".siteSearch").val() || '';
      this.searchString = searchString;
      var items = this.$data.results;
      var postList = [];
      for (x in items) {
        postList.push({
          'id' : items[x].id,
          'vicinity': items[x].vicinity,
          'name': items[x].name,
          'place_id': items[x].place_id,
          'rating': items[x].rating,
          'price' : items[x].price_level,
          'photos' : items[x].photos[0].getUrl()
        });
      }

      return postList;
    },
  },
  created() {
    this.$data.results = lastSearch;
    bus.$on('search', this.handleSearch);
  },
};

const signup = {
  template: $("#signup").html(),
  created() {
    this.signUp();
  }
};

const zoomedInfo = {
  props: ['id'],
  template: $("#zoomedInfo").html(),
  data() {
    return {
      model: undefined
    };
  },
  created() {
    // Used to get the data from an individual selection that was clicked on
    this.$data.results = lastSearch;
    bus.$on('search', this.handleSearch);
    for(x in this.$data.results) {
      if (this.$data.results[x].id == this.id) {
          this.$data.model = this.$data.results[x]
      }
    }

  }
}

const routes = [{
    path: "/",
    component: homepage,
    props: true
  },
  {
    path: "/login",
    component: login,
    props: true
  },
  {
    path: "/signup",
    component: signup,
    props: true
  },
  {
    path: "/account",
    component: account,
    props: true
  },
  {
    path: "/search",
    component: search,
    props: true
  },
  {
    path: "/zoomedInfo/:id",
    component: zoomedInfo,
    props: true
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  router,
});


// Makes google maps, but doesn't show it. Need it to collect data
function initMap() {
  // Area entered
  var input = document.getElementById('pac-input');
  var WhereUAt;

// Autocomplete suggestions
 var autocomplete = new google.maps.places.Autocomplete(input);
 google.maps.event.addListener(autocomplete, 'place_changed', function(){
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lgn = place.geometry.location.lng();
    WhereUAt = {lat: lat, lng: lgn};
    findThem(WhereUAt);
 })

}

// Searches for activities near the place the user enters
function findThem(WhereUAt) {
  var service = new google.maps.places.PlacesService($('#map').get(0));
  var searchFor = ['bar', 'cafe', 'night_club', 'restaurant'];
  for(sf in searchFor) {
    service.nearbySearch({
      location: WhereUAt,
      radius: 20000,
      type: [searchFor[sf]]
    }, callback);
  }
}

//Gets results
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    bus.$emit('search', results);
  }
}
