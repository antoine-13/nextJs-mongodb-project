// pages/api/movie/[id].js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb"; 
import Head from 'next/head';

/**
* @swagger
* /api/movie/{movieId}:
*   get:
*     summary: Get a movie by id
*     parameters:
*       - in: path
*         name: movieId
*         schema:
*           type: string
*         required: true
*         description: ID of the movie to get
*     responses:
*         200:
*             description: all the informations of the movie with id specified
*         404:
*             description: Not Found
*         500:
*             description: Internal server error
*/
export default async function GetMovie(req, res) {
    const { movieId } = req.query
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db.collection("movies").find({_id: ObjectId(movieId) }).toArray();

    if(movie){
        res.json({ movie });
    }
    else if(id == null){
        res.json({status: 500, data: "Need to specify an id"})
    }
    else{
        res.json({status: 404, data: "Not found"})
    }
    
}

