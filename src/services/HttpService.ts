import axios from 'axios'

const HttpService = axios.create({
    baseURL: 'https://pokemon-pichincha.herokuapp.com/pokemons/',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        idAuthor: 1,
    }
});

export default HttpService;
