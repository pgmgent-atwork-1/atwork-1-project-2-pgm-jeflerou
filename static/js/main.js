(() => {
  const app = {
    initialize() {

      this.eventsApi = new EventsApi();
      this.categoriesApi = new CategoriesApi();
      this.newsApi = new NewsApi();

      this.categories = [];
      this.events = null;
      this.currentDay = null;
      this.currentSlug = undefined;
      this.gfBasePath = "https://www.pgm.gent/data/gentsefeesten";

      this.cacheElements();
      this.randomBackground();
      this.registerListeners();
      this.getCurrentDay();
      this.fetchCategories();
      this.fetchNews();
      this.fetchEvents();
      this.getCurrentSlug();


    },

    cacheElements() {
      this.$header_background = document.querySelector('.header_background');
      this.$header_menu = document.querySelector('.header-menu');
      this.$mobile_menu = document.querySelector('.mobile-menu');
      this.$close_button = document.querySelector('.close');
      this.$program_button = document.querySelector('.program');
      this.$chevron = document.querySelector('.chevron');
      this.$program_menu = document.querySelector('.program-menu-days');
      this.$events_home_page = document.querySelector('.events-home-page');
      this.$news_home_page = document.querySelector('.news-home-page');
      this.$img_over_page = document.querySelector('.img-over-page');
      this.$news = document.querySelector('.news');
      this.$events = document.querySelector('.events');
      this.$search = document.querySelector('search');
      this.$search_button = document.querySelector('.search-button');
      // this.$buttons = document.querySelector('.buttons');
      this.$detail_content = document.querySelector('.detail-content');
      this.$sub_nav = document.querySelector('.sub-nav');
    },

    registerListeners() {
      this.$close_button.addEventListener('click', e => {
        this.$mobile_menu.classList.toggle('shown');
        this.$mobile_menu.classList.toggle('hidden');
      }, false);

      this.$header_menu.addEventListener('click', e => {
        this.$mobile_menu.classList.toggle('shown');
        this.$mobile_menu.classList.toggle('hidden');
      }, false);

      this.$program_button.addEventListener('click', e => {
        this.$program_menu.classList.toggle('shown');
        this.$program_menu.classList.toggle('hidden');
        this.$chevron.classList.toggle('rotate-180')
      }, false);

      // if(this.$buttons) {
      //   this.$radio_buttons.addEventListener('click', e => {
      //     console.log(e.target.value);
      //   }, false);
      // };
    },

    createSubNav() {
      if(this.$sub_nav) {
        this.$sub_nav.innerHTML = this.generateSubNavHtml();
      }
    },

    generateSubNavHtml() {
      return `
      <ul>
        ${this.categories.map((category) => `<li> <a href="events/day.html?day=${this.currentDay}#${category}">${category}</a></li>`).join('')}
      </ul>
      `
    },

    getCurrentSlug() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      console.log(params);

      if (params.has("slug")) {
        this.currentSlug = params.get("slug");
      } else {
        this.currentSlug = undefined;
      }
      this.generateDetailPage();
    },

    generateDetailPage() {
      if(this.currentSlug) {
        this.$detail_content.innerHTML = `<h1>${this.currentSlug}</h1>`;
      }
    },

    randomBackground() {
      this.$header_background.style.backgroundImage = `url("https://gf20.qa.stad.gent/themes/custom/gf_theme/build/img/jpg/Gentse-feesten-0${Math.floor(Math.random() * 8) + 1}.jpg")`;
    },

    getCurrentDay() {
      const search = window.location.search;
      const params = new URLSearchParams(search);

      if (params.has("day")) {
        this.currentDay = params.get("day");
      } else {
        this.currentDay = "19";
      }
    },

    async fetchNews() {
      const data = await this.newsApi.getNews();
      if (this.$news_home_page) {
        this.$news_home_page.innerHTML = this.newsForHomePage(data);
      }
      if (this.$news) {
        this.$news.innerHTML = this.newsCompleteOverview(data);
      }
    },

    newsForHomePage(news) {
      const selectedNews = news.slice(0, 3);
      return `
      <ul>
        ${this.generateHtmlForNews(selectedNews)}
      </ul>
      `
    },

    newsCompleteOverview(news) {
      return `
      <ul>
        ${this.generateHtmlForNews(news)}
      </ul>
      `
    },

    generateHtmlForNews(articles) {
      return articles.map((article) => {
        return `
        <li class='article-card'>
          ${this.generateHtmlForArticle(article)}
        </li>
        `
      }).join('');
    },

    generateHtmlForArticle(article) {
      const date = new Date(article.publishedAt);
      return `
      <a href='#'></a>
      <div class='card-container'>
        <div class='img-container'>
          <img src='${this.gfBasePath}${article.picture.medium}' loading='lazy'>
        </div>
        <div class="article-date">
        ${date.getDay()>= 9 ? date.getDay(): `0${date.getDay()}`}/${date.getUTCMonth() + 1 >= 9 ? date.getUTCMonth()+1 : `0${date.getUTCMonth()+1}`}
        </div>
      </div>
      <div class='card-info'>
      <h3>
        ${article.title}
      </h3>
      <p>
        ${article.synopsis}
      </p>
      <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill="#000" fill-rule="nonzero"/></svg>

      </div>
      `
    },

    async fetchCategories() {
      const data = await this.categoriesApi.getCategories();
      this.categories = data;
      this.createSubNav();
    },

    async fetchEvents() {
      const data = await this.eventsApi.getEvents();
      if (this.$events_home_page) {
        this.$events_home_page.innerHTML = this.eventsForHomePage(data);
      }
      if(this.$events) {
      this.$events.innerHTML = this.eventsPerDay(data, this.currentDay);
      }
    },

    eventsPerDay(events, day) {
      events = events.filter((event) => event.day === day);
      this.events = events;
      return `
        <div>
          ${this.eventsPerCategory(events)}
        </div>
      `;
    },

    eventsPerCategory(events) {
      return this.categories.map((category) => {
        console.log(category)
        const selectedEvents = events.filter((event) => event.category.includes(category))
        selectedEvents.sort((event, previousEvent) => {
          if (previousEvent.sort_key > event.sort_key) {
            return 1
          } else if (previousEvent.sort_key < event.sort_key) {
            return -1
          } else {
            return 0
          }
        });
        return `
        <ul>
          <h2 id="${category}">
            ${category}
          </h2>
          ${this.generateHtmlForEvents(selectedEvents)}
        </ul>
        `
      }).join('');
    },

    eventsForHomePage(events) {
      const selectedEvents = [];
      let counter = 0;
      while (counter != 3) {
        selectedEvents.push(events[Math.floor(Math.random() * events.length)]);
        counter++;
      }
      return `
      <ul>
        ${this.generateHtmlForEvents(selectedEvents)}
      </ul>
      `
    },

    generateHtmlForEvents(events) {
      return events.map((event) => {
        console.log(event);
        return `
        <li class='event-card'>
        <a href='events/detail.html?day${event.day}&slug=${event.slug}'></a>
          ${this.generateHtmlForEvent(event)}
        </li>
        `
      }).join('');
    },

    generateHtmlForEvent(event) {
      return `
      <div class="image-container">
        <div style='background-image: url("${event.image !== null? (event.image !== undefined? event.image.full : 'static/media/download.jpg') : 'static/media/download.jpg'}")' class='event-card-background'>
        
        </div>
        <div class='date'>
          <div class='day'>
            ${event.day_of_week.substring(0,2)}
            ${event.day} Jul
          </div>
          <div>
            ${event.start} u.
          </div>
        </div>
      </div>
      <h3>${event.title}</h3>
      <p>${event.location}</p>
      `;
    },

  }
  app.initialize();
})();