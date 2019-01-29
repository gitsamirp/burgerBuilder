import Axios from 'axios';

const instance = Axios.create({
    baseURL: "https://react-my-burger-7805d.firebaseio.com/"
});

export default instance;