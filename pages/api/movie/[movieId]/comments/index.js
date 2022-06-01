// pages/api/movie/[id]/comments
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

/**
* @swagger
* /api/movie/{movieId}/comments:
*   post:
*     summary: Insert a comment for a movie
*     parameters:
*       - in: path
*         name: movieId
*         schema:
*           type: string
*         required: true
*         description: ID of the movie to comment
*     requestBody:
*       description: Endpoint for adding a comment from a user on a specific movie
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             required:
*               - idUser
*               - comment
*             properties:
*               idUser:
*                 type: string
*                 description: user identity
*               comment:
*                 type: string
*                 description: comment to post
*           
*     responses:
*         200:
*             description: comment added to the movie
*         500:
*             description: Internal server error
*         404:
*             description: Not Found
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const userId = req.body.idUser; 
    const commentUser = req.body.comment;
    const movieId = req.query.movieId;

    const user = await db.collection("users").find({_id: ObjectId(userId) }).toArray();

    if(user){
        const comment = {
            name: user[0].name,
            email: user[0].email,
            movie_id: new ObjectId(movieId),
            text: commentUser,
            date: new Date(),
        };
        

        const { insertedId } = await db.collection('comments').insertOne(comment);
        comment._id = insertedId;
        res.json({ status: 200, data: comment });
    }
    else{
        res.json({ status: 404, data: "User not found" });
    }   
}