import request from 'request-promise';
import { BASE_URL, PORT } from 'constants';

class NetworkManager {

    getTodayActivities() {

        var options = {
            method: 'GET',
            uri: `${BASE_URL}:${PORT}/api/web/calendar`,
            headers: {
            },
            json: true // Automatically parses the JSON string in the response
        };

        return request(options)
            .then(function (repos) {
                return repos.body;
            })
            .catch(function (err) {
                if (err.error.resultCode === -401) {
                    return err.error;
                }
            });
    }

    postCode(code) {
        var options = {
            method: 'POST',
            uri: `${BASE_URL}:${PORT}/api/web/calendar`,
            body: {
                code
            },
            json: true  // Automatically parses the JSON string in the response
        };

        return request(options)
            .then(function (repos) {
                return repos;
            })
            .catch(function (err) {
                return err;
            });
    }
}

export default NetworkManager;