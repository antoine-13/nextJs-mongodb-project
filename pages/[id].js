
import Head from 'next/head'
import styles from '../styles/id.module.css';
import dateFormat from "dateformat";

export default function MoviePage({movie}) {
  console.log(movie['movie'][0])
  return (
    <>
        <style jsx global>{`
        body {
            margin: 0;
            padding: 0;
        }
        `}</style>
        <Head>
            <title>{movie['movie'][0].title}</title>
        </Head>
        <div className={styles.mainContainer}>
            <div className={styles.containerInfos}>
                <div>
                    <h1>{movie['movie'][0].title}</h1>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>
                        {movie['movie'][0].fullplot}
                    </p>
                </div>
            </div>
            <div className={styles.containerImages}>
                <div className={styles.cardImage}> 
                    <img src={movie['movie'][0].poster} />
                    <div className={styles.containerImgInfos}>
                        <div className={styles.imgInfos}>
                            <p>Sortie: {dateFormat(movie['movie'][0].released, "dd/mm/yyyy")}</p>
                            <p>Type: {movie['movie'][0].type}</p>
                        </div>
                        <div className={styles.imgInfos}>
                            <div className={styles.movieAuthors}>
                                <p>De </p>
                                {
                                    movie['movie'][0].directors.map( director =>
                                        <p>{director},</p>
                                    )                                   
                                }
                            </div>
                            <div className={styles.movieActors}>
                                <p>Pays: </p>
                                {
                                    movie['movie'][0].countries.map( director =>
                                        <p>{director},</p>
                                    )                                   
                                }
                            </div>
                        </div>    
                    </div> 
                </div>
            </div>
        </div>
    </>
  );
}

export async function getServerSideProps({params}){
    const movie = await fetch(`http://localhost:3000/api/movie/${params.id}`)
    .then(r => r.json())

    return{
        props: {
            movie
        }
    }
}

