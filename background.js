importScripts('ExtPay.js')

var extpay = ExtPay('stock-tracker'); 
extpay.startBackground(); 

extpay.getUser().then(user => {
	console.log(user)
})