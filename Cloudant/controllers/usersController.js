const fs = require('fs');
const USERS_DB = require('../data/users.json');
let CURRENT_ID = 0;
const CLOUDANT_CREDS = require('../localdev-config.json');
const CloudantSDK = require('@cloudant/cloudant');

let username = CLOUDANT_CREDS.cloudant_username || "nodejs";
let password = CLOUDANT_CREDS.cloudant_password;
let url = CLOUDANT_CREDS.url;

var cloudant = CloudantSDK(url);
const USERS_DB_CLOUDANT = cloudant.db.use('users');


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
    insertUser(user) {
        user.uid = this.generateId();
        USERS_DB.push(user);
        return user;
    }
    updateUser(user) {
        let index = USERS_DB.findIndex(element => element.uid === user.uid);
        if (index > -1) {
            USERS_DB[index] = Object.assign(USERS_DB[index], user);
            return user;
        } else {
            return undefined;
        }
    }

    deleteUser(user) {
        let index = USERS_DB.findIndex(element => element.uid === user.uid);
        if (index > -1) {
            USERS_DB.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    getList(cbOk) {
        let users = new Array();
        USERS_DB_CLOUDANT.list({
            include_docs: true
        }).then(entries => {
            // console.table(entries.rows);
            for (let entry of entries.rows) {
                users.push(entry.doc);
            }
            cbOk(users);
        });
        // return USERS_DB;
    }
    getUserByCredentials(email, password) {
        let users = USERS_DB.filter((item, index, arr) => {
            if (item.password.toLowerCase() === password.toLowerCase() &&
                item.email.toLowerCase() === email.toLowerCase()) {
                return true;
            }
            return false;
        });
        return users[0];
    }
    getUniqueUser(name, lastname, email) {
        let users = USERS_DB.filter((item, index, arr) => {
            if (item.nombre.toLowerCase() === name.toLowerCase() &&
                item.apellidos.toLowerCase() === lastname.toLowerCase() &&
                item.email.toLowerCase() === email.toLowerCase()) {
                return true;
            }
            return false;
        });
        return users[0];
    }
    getUser(id) {
        let user = USERS_DB.find(ele => ele.uid === id);
        return user;
    }
    getUserByEmail(email) {
        let user = USERS_DB.find(ele => ele.email === email);
        return user;
    }
}

module.exports = UsersController;