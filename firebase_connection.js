// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

const config = {
    apiKey: "AIzaSyDB4ipx3ebKCosf7VnT562gEPkZzjtul4w",
    authDomain: "osrs-items-data.firebaseapp.com",
    databaseURL: "https://osrs-items-data.firebaseio.com",
    storageBucket: "osrs-items-data.appspot.com"
  };

firebase.initializeApp(config);
// Get a reference to the database service

let number = 0;

function seedItems() {
    firebase.database().ref('/').orderByChild('tradeable_on_ge').startAt(true).once('value').then((snapshot) => {
            snapshot.forEach(doc => {
            insertItem(doc.val())
        })
    })
}

function insertItem(item){
    db('items').returning('id').insert({cost: item.cost, 
                                duplicate: item.duplicate, 
                                equipable: item.duplicate,
                                equipable_by_player: item.equipable_by_player,
                                equipable_weapon: item.equipable_weapon,
                                examine: item.examine,
                                highalch: item.highalch,
                                id: item.id,
                                linked_id_noted: item.linked_id_noted,
                                linked_id_placeholder: item.linked_id_placeholder,
                                lowalch: item.lowalch,
                                members: item.members,
                                name: item.name,
                                noteable: item.noteable,
                                noted: item.noted,
                                placeholder: item.placeholder,
                                quest_item: item.quest_item,
                                release_date: item.release_date,
                                stackable: item.stackable,
                                tradeable: item.tradeable,
                                tradeable_on_ge: item.tradeable_on_ge,
                                weight: item.weight,
                                wiki_name: item.wiki_name,
                                wiki_url: item.wiki_url,
                                image_url: `https://github.com/osrsbox/osrsbox-db/blob/master/docs/items-icons/${item.id}.png?raw=true`,
                                updated_price: '0'
                            }).then(console.log)

                        number += 1;
}

seedItems()

// setTimeout(() => {
//     console.log(number)
// }, 30000)