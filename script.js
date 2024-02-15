fetch('https://cdn.taux.live/api/ecb.json')
    .then((response) => response.json())
    .then(data => {
<<<<<<< Updated upstream
        console.log(data)
        console.log(data.rates.EUR)
=======
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
        const arrayCurrency = Object.keys(data.rates).map(function(rate) {
            return [rate, data.rates[rate]]
        })

        const mySelect = document.querySelectorAll('select')
        console.log(mySelect)
        mySelect.forEach(select =>{
            for(let i = 0 ; i < arrayCurrency.length ; i++){
                const myOptions = `<option value ="${arrayCurrency[i][0]}">${arrayCurrency[i][0]}</option>`
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
            const convertSelect = document.querySelector('select[id="convert"]')
            const currentCurrency = convertSelect.querySelectorAll('option')
            let selectedCurrency = ""
            currentCurrency.forEach(currency => {  
                if(currency.selected){
                    selectedCurrency = currency.value
                }
             })
             console.log(selectedCurrency)
             return selectedCurrency  
        }
        function setAmount(val){
            const newText = document.querySelector('input[id="convert"]')
            newText.value = val
        }
        function convert(amount, sCurr){
            arrayCurrency.forEach(rate => {
                if(sCurr = rate)
            })
            for(let i =0 ; i<arrayCurrency.length ; i++){
                if(sCurr === arrayName[i][1])
            }
            return amount / 
        }
        
        amountText.addEventListener("keyup", () => {
            const secondCurrency = getCurrencyCible()
            const myAmount = getAmount()
            const valConvert = convert(myAmount.value, secondCurrency)
            setAmount(valConvert)
            //setAmount(amountText.value)
        })
            
>>>>>>> Stashed changes
    })