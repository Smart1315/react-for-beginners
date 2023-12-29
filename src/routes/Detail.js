import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

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
        <>
            {loading ? <h1>Loading...</h1> :
                <div>
                    <h1>Detail</h1>
                    <div>
                        <img src={movie.medium_cover_image} alt={movie.title}/>
                        <h2>{movie.title}</h2>
                        <p>{movie.description_full}</p>
                        <ul>
                            {movie.genres.map((g) => (
                                <li key={g}>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}

export default Detail;