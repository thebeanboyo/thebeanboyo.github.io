import jsonData from './rl-directory.json' with { type: 'json' };
document.getElementById('main-form').addEventListener('submit', onSubmit)
let countArr = [];

function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const base = formData.get('base');
    const skin = formData.get('skin');
    const eyes = formData.get('eyes');
    const maneShape = formData.get('mane shape');
    const maneCol = formData.get('mane col');
    const mark1 = formData.get('marking1');
    const mark2 = formData.get('marking2');
    const mark3 = formData.get('marking3');
    const mark4 = formData.get('marking4');
    const mark5 = formData.get('marking5');
    const mark6 = formData.get('marking6');
    const mark7 = formData.get('marking7');
    const mark8 = formData.get('marking8');
    const mark9 = formData.get('marking9');
    const mark10 = formData.get('marking10');
    const th = formData.get('threshhold');
    const marks = [mark1, mark2, mark3, mark4, mark5, mark6, mark7, mark8, mark9, mark10];
    readJSON(base, skin, eyes, maneShape, maneCol, marks, th);
}

function readJSON(base, skin, eyes, shape, col, marks, t){
    for(let i = 0; i < jsonData.length; i++) {
        let count = 0;
        if (jsonData[i].Base.toLowerCase() == base.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].Skin.toLowerCase() == skin.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].Eyes.toLowerCase() == eyes.toLowerCase()) {
            count+=1;
        }
        for(let j = 0; j < marks.length; j++){
            let temp = jsonData[i].Markings[j].split("(")[0];
            temp = temp.substring(0, temp.length - 1);
            if (temp.toLowerCase() == marks[j].toLowerCase()) {
                count+=1;
            }
        }
        countArr.push(count);
    }
    results(t);
}

function results(threshhold){
    for(let i = 0; i < countArr.length; i++) {
        if (countArr[i] > threshhold) {
            console.log(jsonData[i]);
        }
    }
}
