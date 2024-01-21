import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '51fb1dfe-02fa-4bd1-8b1f-de41164483b5'}
}); //создаёт экземпляр axios, шже храним какие-то настройки.

// читать документацию на серваке как и куда запросы делать, иначе не понятно.
// там точно указано на какие энд пойнты делать и каким способом делать запрос, тогда понятно станет написанное.
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`) // по факту будет - (baseUrl + `users?page=${currentPage}&count=${pageSize}`)(но у нас забыл baseURL)
        .then(response => response.data); // возвращаем не весь response, а только data(часть respomse). instance.get - исп инстанс, он допишет то что в объекте там, не надо каждый раз писать.
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId)
    }//старый способ передилегируем.
}

//-----------
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },// работа со статусами пользователя, в данном случаем получить статус с сервера.
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status}); // можно написать{status}, т.к. ключ и знач. одинаковые.
    },// в куки зашит пользователь, так что не отправляем id. Второй параметр json файл, см.докумнт к серверу.
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe }); // в данном случае на серв.ещё отправляем объект с данными.
            // с каким надо смотреть документацию на серваке, что он должен принимать.
    },
    logout(email, password, rememberMe = false) {
        return instance.delete(`auth/login`); // в данном случае на серв.ещё отправляем объект с данными.
        // с каким надо смотреть документацию на серваке, что он должен принимать.
    }
} 



//get - принимает два параметра.(ничего не может передать на сервер кроме адресной строки)
//delete - принимает два параметра.(ничего не может передать на сервер кроме адресной строки)
//post - принимает три параметра.
//put - обновление. Можно вторым параметром отправлять json файл.

