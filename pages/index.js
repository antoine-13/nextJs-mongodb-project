import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({movies}) {
  console.log(movies['movies'])
  return (
    <>
     <Head>
        <title>Movies</title>
     </Head>
     <div  className={styles.searchContainer}>
      <form action="" className={styles.searchBar}>
        <input type="search" name="search" pattern=".*\S.*" required></input>
        <button className={styles.searchBtn} type="submit">
          <span>Search</span>
        </button>
      </form>
     </div>
     <div className={styles.cardsList}>
      {
        movies['movies'].map(
          movie =>
          
          <a href={'http://localhost:3000/' + movie._id}>
            <div className={styles.card}>
              <div className={styles.cardImage}> <img src={movie.poster} /> </div>
              <div className={styles.cardTitle}>
                <p>{movie.title}</p>
              </div>
            </div>
          </a>  
        )
      }
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        a{
          font-style: none;
          text-decoration: none;
        }
      `}</style>
      </div>
    </>
  );
}

export async function getStaticProps(){
  const movies = await fetch('http://localhost:3000/api/movie')
    .then(r => r.json())

  return{
    props: {
      movies
    }
  }
}