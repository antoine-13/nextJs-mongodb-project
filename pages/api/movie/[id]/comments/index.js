// pages/api/movie/[id]/comments
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

/**
* @swagger
* /api/movie/[id]/comments:
*   get:
*     summary: Insert a comment for a movie
*     parameters:
*       - in: [id]
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the movie to comment
*       - in : body
*         name: informations
*         description: Informations
*         schema:
*             type: object
*             required:
*                 - name
*                 - email
*                 - commentUser
*             properties:
*                 name: 
*                     type: string
*                 email:
*                     type: string
*                 commentUser:
*                     type: string
*           
*     responses:
*         201:
*             description: comment added to the movie
*         500:
*             description: Internal server error
*         404:
*             description: Not Found
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const nameUser = req.body.name; 
    const emailUser = req.body.email;
    const commentUser = req.body.commentUser;
    const movieId = req.query.id;

    const comment = {
        name: nameUser,
        email: emailUser,
        movie_id: new ObjectId(movieId),
        text: commentUser,
        date: new Date(),
    };

    const { insertedId } = await db.collection('comments').insertOne(comment);
    comment._id = insertedId;
    res.json({ status: 200, data: comment });
}