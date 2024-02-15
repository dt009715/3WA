fetch('https://cdn.taux.live/api/ecb.json')
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        console.log(data.rates.EUR)
        data.rates.forEach(rate => {
            console.log(rate)
        })
            
    })