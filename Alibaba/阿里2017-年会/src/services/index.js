import request from './request';

async function someRemoteData() {
    return request.get('/someRemoteData.json');
}

export default {
    someRemoteData,
};
