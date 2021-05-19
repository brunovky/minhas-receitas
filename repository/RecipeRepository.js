import firestore from '@react-native-firebase/firestore';

async function findByUser(userId) {
    return firestore()
        .collection("recipes")
        .where("userId", "==", userId)
        .orderBy("datetime", "desc")
        .get()
        .then(snapshot => {
            return Promise.resolve(snapshot.docs);
        });
}

async function save(recipe) {
    return firestore()
        .collection("recipes")
        .add(recipe)
        .then(() => {
            return Promise.resolve();
        });
}

async function edit(recipe, id) {
    return firestore()
        .collection("recipes")
        .doc(id)
        .set(recipe)
        .then(() => {
            return Promise.resolve();
        });
}

async function deleteById(id) {
    return firestore()
        .collection("recipes")
        .doc(id)
        .delete()
        .then(() => {
            return Promise.resolve();
        });
}

module.exports = {
    findByUser,
    save,
    edit,
    deleteById
}