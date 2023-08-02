const BASE_URL = "http://localhost:5000/api/births/";

export default class BirthApi {
  static async addBirth(data) {
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
        throw new Error('Failed to add birth');
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteBirth(id) {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete birth');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateBirth(data) {
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
        throw new Error('Failed to update birth');
      }
    } catch (error) {
      throw error;
    }
  }
}
