go = () => {
    var data = require('./dataimg.json');
    const axios = require('axios');
    const fs = require('fs');
    getCog = (index, now = 0) => {
        return new Promise((resolve, reject) => {
            if (now > 15 || index >= data.length)
                resolve();
            else {
                if (data[index].cog == null) {
                    console.log(index, now);
                    axios({
                        method: 'post',
                        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender,smile',
                        headers: {
                            'Content-Type': 'application/json',
                            'Ocp-Apim-Subscription-Key': '9b2021d4355c4003bb32dd5070c296b2'
                        },
                        data: { url: 'http://www.kiva.org/img/600/' + data[index].image.id + '.jpg' }
                    }).then((result) => {
                        data[index].cog = result.data;
                        resolve(getCog(index + 1, now + 1));
                    })
                }
                else
                    resolve(getCog(index + 1, now));
            }

        })
    }
    getCog(0).then(() => {
        fs.writeFileSync('dataimg.json', JSON.stringify(data));
        console.log('done.');
        setTimeout(go, 60000);
    })
}
go();