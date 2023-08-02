const BASE_URL = "http://localhost:5000/api/milk/";

export default class MilkApi {
  static async addMilk(data) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to add milk');
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteMilk(id) {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete milk');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateMilk(data) {
    const { id } = data;
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to update milk');
      }
    } catch (error) {
      throw error;
    }
  }
}

