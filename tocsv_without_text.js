const data = require('./dataimg.json');
const fs = require('fs');
var text = 'id,status,funded_amount,activity,country,geo_level,post,expire,loan_amount,humans,smile,gender,age,age_rounp\n';

getAgeGrounp = (age) => {
    if(age == 'NA') return 'NA'
    else if(parseFloat(age) >= 60) return 'D'
    else if(parseFloat(age) >= 40) return 'C'
    else if(parseFloat(age) >= 40) return 'B'
    else return 'A'
}
data.forEach((l) => {

    var s = '';
    s += l.id  + ',' + l.status + ',' + l.funded_amount + ',';
    s += l.activity + ',' + l.location.country + ',' + l.location.geo.level + ',';
    s += l.posted_date + ',' + l.planned_expiration_date + ',' + l.loan_amount;
    if (l.cog.length == 0)
        s += ',NA,NA,NA,NA';
    else {
        if (l.cog.length == 1)
            s += ',S,' + l.cog[0].faceAttributes.smile + ',' + l.cog[0].faceAttributes.gender + ',' + l.cog[0].faceAttributes.age;
        else
            s += ',M,NA,NA,NA';
    }
    s += ',' + getAgeGrounp(s.split(',')[s.split(',').length - 1]);
    text += s + '\n';
})
fs.writeFileSync("./dataimg_no_text.csv", text);