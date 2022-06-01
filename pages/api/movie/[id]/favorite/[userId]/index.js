// pages/api/movie/[id]/comments
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../../lib/mongodb";

/**
* @swagger
* /api/movie/{id}/favorite/{userId}:
*   post:
*     summary: Add a favorite for a user
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the movie to add to favorites
*       - in : path
*         name: userId
*         description: ID of the user who wants to add a favorite
*         schema:
*             type: string
*         required: true
*           
*     responses:
*         201:
*             description: favorite added to the list
*         500:
*             description: Internal server error
*         404:
*             description: Not Found
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movieId = req.query.id
    const userId = req.query.userId
    
    const user = await db.collection("users").find({_id: ObjectId(userId) }).toArray();
    const movie = await db.collection("movies").find({_id: ObjectId(movieId) }).toArray();
    

    if(Object.keys(user).length != 0 & Object.keys(movie).length != 0){
        if(await db.collection("favorites").find({user_id: ObjectId(userId), movie_id: ObjectId(movieId)}).toArray()){
            res.json({ status: 500, error: 'Internal server error'});
        }
        else{
            const favorite = {
                user_id: new ObjectId(userId),
                movie_id: new ObjectId(movieId),
            };
            const { insertedId } = await db.collection('favorites').insertOne(favorite);
            favorite._id = insertedId;
            res.json({ status: 201, data: favorite });
        }
        
    }
    else{
        res.json({ status: 404, error: 'Movie or User not found'});
    }
}