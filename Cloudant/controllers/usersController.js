const fs = require('fs');
const USERS_DB = require('../data/users.json');
const CLOUDANT_CREDS = require('../localdev-config.json');
const CloudantSDK = require('@cloudant/cloudant');
let username = CLOUDANT_CREDS.cloudant_username;
let password = CLOUDANT_CREDS.cloudant_password;
let url = CLOUDANT_CREDS.url;
const cloudant = new CloudantSDK(url);
const USERS_DB_CLOUDANT = cloudant.db.use('users');
let CURRENT_ID = 0;

let uids = USERS_DB.map((obj) => {
    return obj.uid
});
CURRENT_ID = Math.max(...uids) + 1;
console.log(`Current id: ${CURRENT_ID}`);
// console.table(USERS_DB);
class UsersController {

    generateId() {
        let id = CURRENT_ID;
        CURRENT_ID++;
        fs
        return id;
    }
    insertUser(user, cbOk, cbError) {
        // user.uid = this.generateId();
        // USERS_DB.push(user);
        // return user;
        USERS_DB_CLOUDANT.insert(user).then((addedEntry) => {
            console.log(addedEntry);
            if (addedEntry.ok) {
                user.rev = addedEntry.rev;
                user.uid = addedEntry.id;
                cbOk(user);
            } else {
                cbOk();
            }
        }).catch(error => {
            cbError(error);
        });
    }
    async updateUser(user) {
        let index = USERS_DB.findIndex(element => element.uid === user.uid);
        if (index > -1) {
            USERS_DB[index] = Object.assign(USERS_DB[index], user);
            return user;
        } else {
            return undefined;
        }
    }
    deleteUser(user, cbOk) {
        // let index = USERS_DB.findIndex(element => element.uid === user.uid);
        // if(index>-1){
        //     USERS_DB.splice(index,1);
        //     return true;
        // }else{
        //     return false;
        // }
        console.log('deleting user');
        USERS_DB_CLOUDANT.destroy(user.uid, user.rev).then((body) => {
            console.log(body);
            if (body.ok) {
                cbOk(true);
            } else {
                cbOk(false);
            }
        })
    }
    getList(cbOk) {
        // return USERS_DB;
        let users = new Array();
        USERS_DB_CLOUDANT.list({
            include_docs: true
        }).then(entries => {
            console.log(entries);
            for (let entry of entries.rows) {
                console.log(entry.doc);
                users.push(entry.doc);
            }
            console.table(users);
            cbOk(users);
        });
    }
    async getUserByCredentials(email, password) {
        // let users = USERS_DB.filter((item,index,arr)=>{
        //     if( item.password.toLowerCase()=== password.toLowerCase() &&
        //         item.email.toLowerCase() === email.toLowerCase()){
        //         return true;
        //     }
        //     return false;
        // });
        // return users[0];
        const q = {
            selector: {
                password: {
                    "$eq": password
                },
                email: {
                    "$eq": email
                }
            }
        };
        let doc = await USERS_DB_CLOUDANT.find(q);
        console.log(doc);
        if (doc.docs.length > 0) {
            return doc.docs[0];
        } else {
            return false;
        }

    }
    getUniqueUser(name, lastname, email, cbOk) {
        // let users = USERS_DB.filter((item,index,arr)=>{
        //     if(item.nombre.toLowerCase()=== name.toLowerCase() &&
        //         item.apellidos.toLowerCase()=== lastname.toLowerCase() &&
        //         item.email.toLowerCase() === email.toLowerCase()){
        //         return true;
        //     }
        //     return false;
        // });
        // return users[0];
        console.log(`$getting unique user ${name} ${lastname} ${email}`);
        const q = {
            selector: {
                nombre: {
                    "$eq": name
                },
                apellidos: {
                    "$eq": lastname
                },
                email: {
                    "$eq": email
                }
            }
        };
        USERS_DB_CLOUDANT.find(q).then((docs) => {
            console.log(docs);
            if (docs.docs.length > 1) {
                let user = {
                    nombre: docs.docs[0].nombre,
                    apellidos: docs.docs[0].apellidos,
                    email: docs.docs[0].email,
                    password: docs.docs[0].password,
                    fecha: docs.docs[0].fecha,
                    sexo: docs.docs[0].sexo,
                    image: docs.docs[0].image,
                    uid: docs.docs[0]._id,
                    rev: docs.docs[0]._rev
                }
                cbOk(user);
            } else {
                cbOk();
            }
        });
    }
    async getUser(id) {
        // let user = USERS_DB.find(ele=>ele.uid ===id);
        // return user;
        // const q = {
        //     selector: {
        //         email: {
        //             "$eq": email
        //         }
        //     }
        // };
        let docs = await USERS_DB_CLOUDANT.get(id);
        // console.log(docs);
        return docs;
    }
    getUserByEmail(email, cbOk) {
        // let user = USERS_DB.find(ele=>ele.email ===email);
        // return user;
        const q = {
            selector: {
                email: {
                    "$eq": email
                }
            }
        };
        USERS_DB_CLOUDANT.find(q).then((docs) => {
            console.log(docs);

            if (docs.docs.length > 0) {
                let user = {
                    nombre: docs.docs[0].nombre,
                    apellidos: docs.docs[0].apellidos,
                    email: docs.docs[0].email,
                    password: docs.docs[0].password,
                    fecha: docs.docs[0].fecha,
                    sexo: docs.docs[0].sexo,
                    image: docs.docs[0].image,
                    uid: docs.docs[0]._id,
                    rev: docs.docs[0]._rev
                }
                cbOk(user);
            } else {
                cbOk();
            }
        });
    }
}
module.exports = UsersController;