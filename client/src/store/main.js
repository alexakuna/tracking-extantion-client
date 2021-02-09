import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    headers: {'Authorization': localStorage.getItem('token')}
});
export default {
    actions: {
        async main({commit}) {
            return await axios.post('/api/', {id: localStorage.getItem('seller-id')},{
                baseURL: 'http://localhost:3000',
                timeout: 3000,
                headers: {'Authorization': localStorage.getItem('token')}
            }).then(res => {
                commit('SHOP_NAMES', res.data)
                return res.data
            })
        }
    }
}
