const CLOUDANT_CREDS = require('./localdev-config.json');
const CloudantSDK = require('@cloudant/cloudant');
let url = CLOUDANT_CREDS.url;
const cloudant = new CloudantSDK(url);
const USERS_DB_CLOUDANT = cloudant.db.use('users');

console.log();

// function getList() {
//     USERS_DB_CLOUDANT.list().then((data) => {
//         console.log(data);
//     })
// }

async function getList() {
    //regresa un promise
    return await USERS_DB_CLOUDANT.list({
        include_docs: true
    });
}

function route() {
    let users = getList().then((res) => {
        console.log("\nresponse: ");
        console.log(res);
    });
    console.log("return de getList: ");
    console.log(users);
}

route();