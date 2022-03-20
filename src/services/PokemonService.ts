import HttpService from "./HttpService";

interface Pokemon {
    name: string
    image: string
    attack: number
    defense: number
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
    
    list() {
        return HttpService.get('/');
    },
    
    update(id: number, data: Pokemon) {
        return HttpService.put(id.toString(), data);
    },
    
    delete(id: number) {
        return HttpService.delete(id.toString());
    }
}
