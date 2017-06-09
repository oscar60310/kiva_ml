var data = require('./dataimg.json');
var gdp = require('./GDP.json');
const fs = require('fs');
findGDP  = (country) =>{
    var s = 'NA';
    for(var i = 0 ; i < gdp.length ; i++){
        if(gdp[i].Country == country){
            s = (String(gdp[i].GDP)).replace(/,/g,'');
            break;
        }
    }
    return s;

}
data.forEach((l) => {
    l.GDP = findGDP(l.location.country);
})
fs.writeFileSync('dataimg.json', JSON.stringify(data));