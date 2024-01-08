import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '51fb1dfe-02fa-4bd1-8b1f-de41164483b5'}
}); //создаёт экземпляр axios, шже храним какие-то настройки.

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`) // по факту будет - (baseUrl + `users?page=${currentPage}&count=${pageSize}`)(но у нас забыл baseURL)
        .then(response => response.data); // возвращаем не весь response, а только data(часть respomse). instance.get - исп инстанс, он допишет то что в объекте там, не надо каждый раз писать.
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`/follow?page=${currentPage}&count=${pageSize}`)
//     .then(response => response.data); // возвращаем не весь response, а только data(часть respomse).
// }

//get - принимает два параметра.
//delete - принимает два параметра.
//post - принимает три параметра.

