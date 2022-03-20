import HttpService from "./HttpService";

export type PokemonType = 'fire' | 'water' | 'normal' | 'bug' | 'poison';

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: PokemonType;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
    created_at: string;
    updated_at: string;
}

export interface PokemonCreate {
    name: string;
    image: string;
    type: PokemonType;
    hp: number;
    attack: number;
    defense: number;
}

export default {
    create(data: PokemonCreate): Promise<Pokemon> {
        data = {...data, ...{idAuthor: 1}};
        return new Promise((resolve, reject) => {
            HttpService.post('/', data)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    },

    count(): Promise<number> {
        return new Promise((resolve, reject) => {
            HttpService.get('count')
                .then(response => {
                    console.log('res', response.data)
                    resolve(response.data)
                })
                .catch(error => reject(error));
        })
    },
    
    list(): Promise<Pokemon[]> {
        return new Promise<Pokemon[]>((resolve, reject) => {
            HttpService.get('/')
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },
    
    update(id: number, data: PokemonCreate): Promise<Pokemon> {
        data = {...data, ...{idAuthor: 1}};
        return new Promise((resolve, reject) => {
            HttpService.put(id.toString(), data)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    },
    
    delete(id: number): Promise<Pokemon> {
        return new Promise((resolve, reject) => {
            HttpService.delete(id.toString())
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
}
