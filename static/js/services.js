class EventsApi {
  static async getEvents() {
    try {
      const response = await fetch('https://www.pgm.gent/data/gentsefeesten/events.json');
      const data = await response.json();
      return data;
    } catch {
      console.error('failed to retrieve events data ');
    }
  }
}

class CategoriesApi {
  static async getCategories() {
    try {
      const response = await fetch(' https://www.pgm.gent/data/gentsefeesten/categories.json');
      const data = await response.json();
      return data;
    } catch {
      console.error('failed to retrieve category data');
    }
  }
}

class NewsApi {
  static async getNews() {
    try {
      const response = await fetch(' https://www.pgm.gent/data/gentsefeesten/news.json');
      const data = await response.json();
      return
    } catch {
      console.error('failed to retrieve news data');
    }
  }
}