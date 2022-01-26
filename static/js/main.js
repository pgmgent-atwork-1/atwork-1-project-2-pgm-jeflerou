(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.randomBackground();
      this.registerListeners();
    },

    cacheElements() {
      this.$header_background = document.querySelector('.header_background');
      this.$header_menu = document.querySelector('.header-menu');
      this.$mobile_menu = document.querySelector('.mobile-menu');
      this.$close_button = document.querySelector('.close');
      this.$program_button = document.querySelector('.program');
      this.$chevron = document.querySelector('.chevron')
      this.$program_menu = document.querySelector('.program-menu-days');
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
    },

    randomBackground() {
      this.$header_background.style.backgroundImage = `url("https://gf20.qa.stad.gent/themes/custom/gf_theme/build/img/jpg/Gentse-feesten-0${Math.floor(Math.random() * 8) + 1}.jpg")`;
    },

    async fetchNews() {

    },

    async fetchCategories() {

    },

    async fetchEvents() {

    },

  }
  app.initialize();
})();