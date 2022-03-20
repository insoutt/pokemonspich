import HttpService from "./HttpService";

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
    created_at: string;
    updated_at: string;
}

export default {
    create(data: Pokemon) {
        return HttpService.post('/', {
            params: {
                idAuthor: 1,
            },
        })
    },

    get(id: number) {
        return HttpService.post(id.toString());
    },
    
    list(): Promise<Pokemon[]> {
        return new Promise<Pokemon[]>((resolve, reject) => {
            HttpService.get('/')
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },
    
    update(id: number, data: Pokemon) {
        return HttpService.put(id.toString(), data);
    },
    
    delete(id: number) {
        return HttpService.delete(id.toString());
    }
}
