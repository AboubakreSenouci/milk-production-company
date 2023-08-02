const BASE_URL = "http://localhost:5000/api/examinations/";

export default class ExaminationApi {
  static async addExam(data) {
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
        throw new Error('Failed to add examination');
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteExam(id) {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete examination');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateExam(data) {
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
        throw new Error('Failed to update examination');
      }
    } catch (error) {
      throw error;
    }
  }
}
