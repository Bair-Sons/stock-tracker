importScripts('ExtPay.js')

const extpay = ExtPay('stock-tracker')
extpay.startBackground(); 

extpay.getUser().then(user => {
	console.log(user)
})