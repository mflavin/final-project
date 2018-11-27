const homepage = {
  template: $("#homepage").html(),
  data()
  {
      return {
          itemQuantity: 0
      };
  },
  methods: {
    searching: function() {
      router.push({ path: 'search' })
    }
  }
};

const search = {
  template: $("#search").html()
};

const routes = [
    {
        path: "/",
        component: homepage,
        props: true
    },
    {
        path: "/search",
        component: search,
        props: true
    }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
  router
}).$mount('#app');

var demo = new Vue({
  el: '#main',
  // router,
  data: {
    searchString: "",
    articles: [{
        "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
        "dollar": "$$$",
        "title": "Maria's",
        "url": "http://www.community-bar.com/",
        "image": "http://www.community-bar.com/wp-content/uploads/2010/11/cropped-marias_masthead_optimized11.jpg"
      },
      {
        "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        "dollar": "$$",
        "title": "Museum of Science and Industry",
        "url": "https://www.msichicago.org/",
        "image": "https://www.radiomuseum.org/museum/usa/museum-of-science-and-industry-msi-chicago/images/us_museum_of_science_and_industry_chicago_building_side.jpg"
      },
      {
        "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        "dollar": "$$",
        "title": "Adler Planetarium",
        "url": "https://www.adlerplanetarium.org/",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Adler_external_1.jpg"
      },
      {
        "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
        "dollar": "$",
        "title": "Sears Tower",
        "url": "http://www.thesearstower.com/",
        "image": "http://www.trbimg.com/img-58d2f51a/turbine/ct-willis-tower-renovation-0323-biz-jpg-20170322/750/750x422"
      },
      {
        "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
        "dollar": "$$$",
        "title": "Chicago Art Museum",
        "url": "https://www.artdesignchicago.org/",
        "image": "https://media.timeout.com/images/100892139/1024/576/image.jpg"
      },
      {
        "rating": '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
        "dollar": "$$$$",
        "title": "Shedd Aquarium",
        "url": "https://www.sheddaquarium.org/",
        "image": "http://www.trbimg.com/img-5887ba95/turbine/ct-shedd-is-free-for-veterans-on-veterans-day--001/1150/1150x647"
      }
    ]
  },
  computed: {
    filteredArticles: function() {
      var articles_array = this.articles,
        searchString = this.searchString;

      if (!searchString) {
        return articles_array;
      }

      searchString = searchString.trim().toLowerCase();

      articles_array = articles_array.filter(function(item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });

      return articles_array;
    }
  }
});
