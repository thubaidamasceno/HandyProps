import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

if (window.setAPI_ROOT)
    window.setAPI_ROOT();

const encode = encodeURIComponent;
const responseBody = res => res.body;

var token = '';
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
};

// RequestHead
export const rh = (verb, url, body) => {
    url = url.match(/^http/) ? url : `${window.API_ROOT}${url}`;
    switch (verb) {
        case 'post':
            return superagent.post(url, body);
        case 'put':
            return superagent.put(url, body);
        case 'patch':
            return superagent.patch(url, body);
        case 'del':
            return superagent.del(url);
        case 'head':
            return superagent.head(url);
        case 'get':
            return superagent.get(url);
        default:
            throw Error(`verbo desconhecido ${verb}`);
    }
};
// RequestTail
export const rt = (r) => {
    return r.use(tokenPlugin).then(responseBody);
};

const requests = {
    del: url =>
        superagent.del(`${window.API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${window.API_ROOT}${url}`).use(tokenPlugin).timeout(4000).then(responseBody),
    put: (url, body) =>
        superagent.put(`${window.API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${window.API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    current: () =>
        requests.get('/user/current'),
    login: (username, password) =>
        requests.post('/user/login', {user: {username, password}}),
    register: user =>
        requests.post('/user/users', {user}),
    preregister: user =>
        requests.post('/user/preusers', {user}),
    save: user =>
        requests.put('/user/user', {user})
};

const Tags = {
    getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, {slug: undefined});
const Articles = {
    all: page =>
        requests.get(`/articles?${limit(10, page)}`),
    byAuthor: (author, page) =>
        requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
    byTag: (tag, page) =>
        requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    del: slug =>
        requests.del(`/articles/${slug}`),
    favorite: slug =>
        requests.post(`/articles/${slug}/favorite`),
    favoritedBy: (author, page) =>
        requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
    feed: () =>
        requests.get('/articles/feed?limit=10&offset=0'),
    get: slug =>
        requests.get(`/articles/${slug}`),
    unfavorite: slug =>
        requests.del(`/articles/${slug}/favorite`),
    update: article =>
        requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
    create: article =>
        requests.post('/articles', {article})
};

const Comments = {
    create: (slug, comment) =>
        requests.post(`/articles/${slug}/comments`, {comment}),
    delete: (slug, commentId) =>
        requests.del(`/articles/${slug}/comments/${commentId}`),
    forArticle: slug =>
        requests.get(`/articles/${slug}/comments`)
};

const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)
};


const expd = {
    Articles,
    Auth,
    Comments,
    Profile,
    Tags,
    setToken: _token => {
        token = _token;
    },
    agent: {superagent: superagent, requests: requests},
};
export default expd;