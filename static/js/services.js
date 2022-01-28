function EventsApi () {
  this.getEvents = async () => {
    try {
      const response = await fetch('https://www.pgm.gent/data/gentsefeesten/events.json');
      const data = await response.json();
      return data;
    } catch {
      console.error('failed to retrieve events data ');
    }
  };
}

function CategoriesApi () {
  this.getCategories = async () => {
    try {
      const response = await fetch(' https://www.pgm.gent/data/gentsefeesten/categories.json');
      const data = await response.json();
      return data;
    } catch {
      console.error('failed to retrieve category data');
    }
  }
}

function  NewsApi () {
  this.getNews = async () => {
    try {
      const response = await fetch(' https://www.pgm.gent/data/gentsefeesten/news.json');
      const data = await response.json();
      return data;
    } catch {
      console.error('failed to retrieve news data');
    }
  }
}