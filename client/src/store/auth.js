import axios from "axios";
export default {
    actions: {
        async login({dispatch}, {seller, password, token}) {
            return axios.post('http://localhost:3000/api/auth/login', {seller, password, token})
        }
    }
}
