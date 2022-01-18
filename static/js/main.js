(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.randomBackground();
    },

    cacheElements() {
      this.$header = document.querySelector('#header');
    },

    registerListeners() {

    },

    randomBackground() {
      this.$header.style.backgroundImage = `url("https://gf20.qa.stad.gent/themes/custom/gf_theme/build/img/jpg/Gentse-feesten-0${Math.floor(Math.random() * 9)}.jpg")`;
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