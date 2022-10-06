import participants from "./ParticipantsWithCaseIDs.json";
import data from "./JSSUserStudyCases_311Education.json";


//Get the cases assigned to the participant 
export function getUserData(participant_id) {
    //Get the id cases for the participant such as [6,34, 41]
    const caseIds = participants[participant_id ? participant_id : 0]["caseID"];

    let dataArr = []
    let dataArray = [];

    //Get the cases for the cases id ( [6,34, 41] )
    // We iterate over the cases in the case list above example
    for (const caseId of caseIds) {
        let extArr = data.filter((d) => d.caseID === caseId);

        dataArr.push(mendData(extArr));
        // We concatenate the cases in one case array
        // dataArr = [...dataArr, ...extArr]
    }

    for (const arr of dataArr) {
        dataArray = [...dataArray, ...arr];

    }

    return dataArray

    // return [...attributes, ...methods]
}


const mendData = (arr) => {

    const len = arr.length;
    const left = 15 - len;

    for (let i = 0; i < left; i++) {
        arr = [...arr, null]
    }
    return arr
}

// We make data that will be consumed by the react table. 
/**
 * [{
 *    title: name,
 *    correct: false,
 *    obvious: false,
 *    redundant: false,
 *    contextualized: false,
 *    generalizable: false
 * },{
 *    title: name,
 *    correct: false,
 *    obvious: false,
 *    redundant: false,
 *    contextualized: false,
 *    generalizable: false
 * }]
 */

export const makeData = (data) => {
    let newData = []

    for (const d of data) {
        if (d) {
            let item = {
                item: d.itemName,
                itemType: d.type === "Property" ? "Attribute" : 'Method',
                correct: false,
                obvious: false,
                redundant: false,
                contextualized: false,
                generalizable: false,
                photo: d.targetID
            }
            newData.push(item)
        } else {
            let item = {
                item: null,
                itemType: null,
                correct: null,
                obvious: null,
                redundant: null,
                contextualized: null,
                generalizable: null,
                caseId: null
            }
            newData.push(item)
        }

    }
    return newData;
}
