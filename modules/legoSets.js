const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        setData.forEach(setElement => {
            let setWithTheme = {...setElement, theme: themeData.find (themeElement => themeElement.id == setElement.theme_id).name}
            sets.push(setWithTheme);
            resolve();
        });
    });
}

function getAllSets(){
    return new Promise((resolve,reject) => {
        resolve(sets);
    });
}

function getSetByNum(setNum){
    return new Promise((resolve,reject) => {
        let setFound = sets.find(x => x.set_num == setNum);

        if(setFound){
            resolve(setFound);
        }else{
            reject("Unable to find set");
        }
    });
}

function getSetsByTheme(theme){
    return new Promise((resolve, reject) => {
        let setsFound = sets.filter(x => x.theme.toUpperCase().includes(theme.toUpperCase()));

        if (setsFound) {
            resolve(setsFound);
        }else{
            reject("Unable to find theme");
        }
    });
}


module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };