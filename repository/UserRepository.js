import firestore from '@react-native-firebase/firestore';

async function findByEmailAndPassword(email, password) {
    return firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then(snapshot => {
            if (snapshot.size <= 0) {
                return Promise.resolve(null);
            } 
            return Promise.resolve(snapshot.docs[0].id);
        });
}

async function findByEmail(email) {
    return firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then(snapshot => {
            return Promise.resolve(snapshot.size > 0);
        });
}

async function save(email, password) {
    return firestore()
        .collection("users")
        .add({
            email: email,
            password: password
        })
        .then(() => {
            return findByEmailAndPassword(email, password);
        });
}

module.exports = {
    findByEmailAndPassword,
    findByEmail,
    save
}