const uuid = require('uuid/v4');

const db = require('../util/db');

class Post {
    constructor(title, body, userId) {
        this.id = uuid();
        this.title = title;
        this.body = body;
        this.userId = userId;
    }

    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM posts');
            return result[0];
        } catch (error) {
            console.log(error);
        }
    }

    static async getById(postId) {
        try {
            const result = await db.query('SELECT * FROM posts WHERE id = ?', [
                postId
            ]);
            return result[0][0];
        } catch (error) {
            console.log(error);
        }
    }

    static async updateById(postId, updatedPost) {
        try {
            const result = await db.query(
                'UPDATE posts SET title = ?, body = ?, userId = ? WHERE id = ?',
                [
                    updatedPost.title,
                    updatedPost.body,
                    updatedPost.userId,
                    postId
                ]
            );
            return result[0][0];
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteById(postId) {
        try {
            const result = await db.query('DELETE FROM posts WHERE id = ?', [
                postId
            ]);
            return result[0][0];
        } catch (error) {
            console.log(error);
        }
    }

    async save() {
        try {
            const result = await db.query(
                'INSERT INTO posts VALUES(?, ?, ?, ?)',
                [this.id, this.title, this.body, this.userId]
            );
            return result[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Post;
