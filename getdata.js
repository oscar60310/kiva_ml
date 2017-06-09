const axios = require('axios');
const fs = require('fs');
get_loans = (page, stop, loans = []) => {
    return new Promise((resolve, reject) => {
        console.log(page);
        axios.get('https://api.kivaws.org/v1/loans/search.json?sort_by=newest&page=' + page).then((data) => {
            console.log(data.data.loans[0].posted_date.split('T')[0]);
            data.data.loans.forEach((l) => {
                    loans.push(l);
            })
            if (page == stop)
                resolve(loans);
            else
                resolve(get_loans(page + 1, stop,loans));
        });

    });
}
get_loans(200,250).then((data) => {
    fs.writeFileSync("./data.json", JSON.stringify(data));
})