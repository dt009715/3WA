fetch('https://cdn.taux.live/api/ecb.json')
    .then((response) => response.json())
    .then(data => {
        console.log(data.rates)
        // const copie = Object.create(Object.getPrototypeOf(data.rates))
        // const propNames = Object.getOwnPropertyNames(data.rates)
        // propNames.forEach((rate) => {
        //     let desc = Object.getOwnPropertyDescriptor(data.rates, rate)
        //     Object.defineProperty(copie, rate, desc)
            
        // })
        // console.log(copie)
        // copie.forEach((element) => {
        //     console.log(element)
        // })
        // data.rates.forEach((rate) => {
        //     console.log(rate)
        // })
            
        // Array.from(data.rates).forEach((rate) => {
        //     console.log(rate)
        // })
        const arrayNames = Object.keys(data.rates).map(function(rate) {
            return [rate, data.rates[rate]]
        })

        const mySelect = document.querySelectorAll('select')
        console.log(mySelect)
        mySelect.forEach(select =>{
            for(let i = 0 ; i < arrayNames.length ; i++){
                const myOptions = `<option value ="${arrayNames[i][0]}">${arrayNames[i][0]}</option>`
                select.innerHTML += myOptions
             }

        })
        
        
        let ammount = 0
        let currency = ""
        const amountText = document.querySelector('input[id="cible"]') 

        // function getCurrency(){
        //     const currentCurrency = document.querySelectorAll('option')
        //     currentCurrency.forEach(currency => {
        //         if(currency.selected){
        //             return currency.value
        //         }
        //     })
        // }
        function getAmount(){
            return document.querySelector('input[id="cible"]')
        }
        function getCurrencyCible(){
            //return document.querySelector('select[id="convert"]')
            const convertSelect = document.querySelector('select[id="convert"]')
            const currentCurrency = convertSelect.querySelectorAll('option')
            currentCurrency.forEach(currency => {  
                if(currency.selected){
                    return currency
                }
             })
        }
        function setAmount(val){
            const newText = document.querySelector('input[id="convert"]')
            newText.value = val
        }
        function convert(amount, sCurr){
            return amount / sCurr
        }
        
        amountText.addEventListener("keyup", () => {
            const secondCurrency = getCurrencyCible()
            const myAmount = getAmount()
            console.log(myAmount.value)
            console.log(secondCurrency)
            const valConvert = convert(myAmount.value, secondCurrency)
            setAmount(valConvert)
            //setAmount(amountText.value)
        })
            
    })