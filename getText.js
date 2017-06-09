go = () => {
    var data = require('./dataimg.json');
    const axios = require('axios');
    const fs = require('fs');
    getdes = () => {
        return new Promise((resolve, reject) => {
            console.log('loading data');
            var send = [];
            var i = 0;
            var req_str = '';
            while (send.length < 50 && i < data.length) {
                if (data[i].sentiment == null) {
                    send.push({ id: data[i].id, language: "en" });
                    req_str += data[i].id + ',';
                }
                i++;
            }
            console.log('to',i);
            req_str = req_str.slice(0, req_str.length - 1) + '.json';
            console.log('Get description');
            axios.get('https://api.kivaws.org/v1/loans/' + req_str).then((res) => {
                res.data.loans.forEach((l) => {
                    var t = l.description.texts['en'].replace(/\n/g, ' ');
                    var j = 0;
                    while (send[j].id != l.id) j++;
                    send[j].text = t;
                });
                resolve(send);
            })
        });
    }

    getSentiment = (res) => {
        console.log('Get Sentiment')
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': 'd17841cd346e4717b6b87c64d9c855e6'
                },
                data: { documents: res }
            }).then((result) => {
                result.data.documents.forEach((l) => {
                    var j = 0;
                    while (res[j].id != l.id) j++;
                    res[j].sentiment = l.score;
                });
                res.forEach((l) => {
                    var j = 0;
                    while (data[j].id != l.id) j++;
                    data[j].texts = l.text;
                    data[j].sentiment = l.sentiment;
                })
                resolve();
            })
        });
    }
    getdes().then(getSentiment).then(() => {
         fs.writeFileSync('dataimg.json', JSON.stringify(data));
         console.log('ok');
         setTimeout(go, 20000);
    });
}
go();
