import Dexie from 'dexie';
import store2 from 'store2'

var dataSourcesList = store2.get('handyPropsDataSource')

if (!dataSourcesList) {
    store2.set('handyPropsDataSource',
        'https://demo.handyprops.damasceno.pro/public/HandyPropsData.json'
    )
}

export function setHandyPropsDataSource(handyPropsDataSource) {
    store2.set('handyPropsDataSource', handyPropsDataSource)
}

export function getHandyPropsDataSource(handyPropsDataSource) {
    return store2.get('handyPropsDataSource');
}

export const db = new Dexie('HandyProps#1');
db.version(1).stores({materials: '_id'});

export function loadMaterials() {
    return ({data, dataSourceName}) => {
        db.table(dataSourceName).clear();
        db.table(dataSourceName)
            .bulkAdd(data[dataSourceName]).then((lastKey) => {
        }).catch(Dexie.BulkError, (e) => {
            return false;
        });
        return true;
    };
}

export function listMaterials(filter) {
    return (cb) => {
        return db.table('materials')
            .filter(
                filter
                // () => true
            )
            .toArray()
            .then(cb);
    };
}

export function countMaterials() {
    return (cb) => {
        return db.table('materials').count()
            .then(cb);
    };
}
//
// export function addTodo(title) {
//     return (dispatch) => {
//         const todoToAdd = { title, done: false };
//         db.table('todos')
//             .add(todoToAdd)
//             .then((id) => {
//                 dispatch({
//                     type: ADD_TODO,
//                     payload: Object.assign({}, todoToAdd, { id }),
//                 });
//             });
//     }
// }
//
// export function deleteTodo(id) {
//     return (dispatch) => {
//         db.table('todos')
//             .delete(id)
//             .then(() => {
//                 dispatch({
//                     type: DELETE_TODO,
//                     payload: id,
//                 });
//             });
//     };
// }
//
// export function updateTodo(id, done) {
//     return (dispatch) => {
//         db.table('todos')
//             .update(id, { done })
//             .then(() => {
//                 dispatch({
//                     type: UPDATE_TODO,
//                     payload: { id, done },
//                 });
//             });
//     };
// }


export default db;
