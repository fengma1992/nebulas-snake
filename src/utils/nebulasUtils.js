/**
 * Created by dujianhao on 2018/5/24.
 */
import NebPay from 'nebpay'

const callbackUrl = NebPay.config.testnetUrl
const nebPay = new NebPay()
const dappAddress = 'n1tPNhEfVPymAhuVRYsTfHo71CZkr81UKVY'
const myAccount = 'n1FQy3GYN6EbF5ajqScUjLH6zXBN5HW2Nx4'

/**
 * 如果只查询类的请求 就不需要去支付 直接使用 nebPay 的 simulateCall 即可
 * 如果不是查询类的 需要调用支付接口 使用 nebPay 的 call 调用
 */

/**
 * @param payId
 * @returns {*}
 */
function queryPayInfo (payId) {
  return nebPay.queryPayInfo(payId, { callback: callbackUrl }) // search transaction result from server (result upload to server by app)
}

/**
 * nebulas contract call (pay required)
 * @param {String} callFunction contract function to call
 * @param {Array} params params to send
 */
function payCall (callFunction, params = []) {
  return new Promise((resolve, reject) => {
    const to = dappAddress
    const value = '0'
    const callArgs = JSON.stringify(params)
    nebPay.call(to, value, callFunction, callArgs, {
      listener: res => {
        resolve(res)
        // setInterval(() => {
        //   queryPayInfo(payId)
        //     .then(resp => {
        //       console.log(resp)
        //     })
        //     .catch(err => {
        //       console.log(err)
        //     })
        // }, 11000)
      }
    })
  })
}

/**
 * nebulas contract call
 * @param {String} callFunction contract function to call
 * @param {Array} params params to send
 */
function freeCall (callFunction, params = []) {
  return new Promise((resolve, reject) => {
    const to = dappAddress
    const value = '0'
    const callArgs = JSON.stringify(params)
    nebPay.simulateCall(to, value, callFunction, callArgs, {
      listener: res => {
        console.log(res)
        resolve(res.result)
      }
    })
  })
}

function nebulasPay (value = 0, options = {}) {
  return new Promise((resolve, reject) => {
    const payId = nebPay.pay(myAccount, value, {
      qrcode: {
        showQRCode: false
      },
      goods: {
        name: options.name || 'Nebulas Snake',
        desc: options.desc || 'NAS for start game'
      },
      callback: callbackUrl,
      listener: res => {
        try {
          resolve(JSON.parse(res.result), payId)
        } catch (e) {
          reject(res.result)
        }
      } // set listener for extension transaction result
    })
  })
}

function getUserAddress () {
  return new Promise((resolve, reject) => {
    function getAddress (e) {
      try {
        const account = e.data.data.account
        if (account) {
          window.removeEventListener('message', getAddress)
          resolve(account)
        }
      } catch (e) {}
    }

    window.addEventListener('message', getAddress)
    window.postMessage({
      target: 'contentscript',
      method: 'getAccount'
    }, '*')
  })
}

export default {
  nebulasPay,
  freeCall,
  payCall,
  queryPayInfo,
  getUserAddress,
}
