// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

export async function findTenFisrtMovies(db){
    const client = await clientPromise;
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    return res.json({ status: 200, data: movies });
}

export async function findMovieById(db, id){
    const movie = await db.collection("movies").find({id: id}).toArray();

    return movie;
}