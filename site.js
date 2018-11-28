const homepage = {
  template: $("#homepage").html(),
  methods: {
    searching: function() {
      router.push({ path: 'search', component: search })
    }
  }
};

const search = {
  template: $("#search").html(),
  data() {
      return {
          searchString: $(".siteSearch").val(),
          article: [
            {
              "id" : 0,
              "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
              "dollar": "$$$",
              "title": "Maria's",
              "url": "http://www.community-bar.com/",
              "image": "http://www.community-bar.com/wp-content/uploads/2010/11/cropped-marias_masthead_optimized11.jpg"
            },
            {
              "id" : 1,
              "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
              "dollar": "$$",
              "title": "Adler Planetarium",
              "url": "https://www.adlerplanetarium.org/",
              "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Adler_external_1.jpg"
            },
            {
              "id" : 2,
              "rating": '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
              "dollar": "$",
              "title": "Sears Tower",
              "url": "http://www.thesearstower.com/",
              "image": "http://www.trbimg.com/img-58d2f51a/turbine/ct-willis-tower-renovation-0323-biz-jpg-20170322/750/750x422"
            },
          ]
      };
  },
  computed: {
    filteredArticles: function() {
      var articles_array = this.article,
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
};

const zoomedInfo = {
  props: ['id', 'image', 'rating', 'dollar', 'title'],
  template: $("#zoomedInfo").html(),
}

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
    },
    {
        path: "/zoomedInfo",
        name: 'zoomedInfo',
        component: zoomedInfo,
        props: true
    }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
  el: '#app',
  router
});
