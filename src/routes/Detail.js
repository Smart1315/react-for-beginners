import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import homeStyles from "./Home.module.css";
import styles from "../components/Movie.module.css";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();

        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div className={homeStyles.container}>
            {loading ?
                <div className={homeStyles.loader}>
                    <span>Loading...</span>
                </div>
                :
                <div className={homeStyles.movies}>
                    <h1>Detail</h1>
                    <div>
                        <img src={movie.medium_cover_image} alt={movie.title} className={styles.movie__img}/>
                        <h2>{movie.title}</h2>
                        <h3 className={styles.movie__year}>{movie.year}</h3>
                        <p>{movie.description_full}</p>
                        <ul className={styles.movie__genres}>
                            {movie.genres.map((g) => (
                                <li key={g}>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;