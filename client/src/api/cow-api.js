const BASE_URL = "http://localhost:5000/api/cows/";

export default class CowApi {
    static async addCow(data) {
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
                throw new Error('Failed to add cow');
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteCow(id) {
        try {
            const response = await fetch(`${BASE_URL}${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to delete cow');
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateCow(data) {
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
                throw new Error('Failed to update cow');
            }
        } catch (error) {
            throw error;
        }
    }
}


