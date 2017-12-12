import {Config} from '../config/config'

const fetchUtil = function(url) {

    return fetch(url, {})
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(response.statusText);
            }
        })
        .then(json => {
            return json;
        }).catch(error => {
            return error;
        });
};

export default fetchUtil;