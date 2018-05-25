/**
 * Created by dujianhao on 2018/5/24.
 */
import NebPay from 'nebpay'

const nebPay = new NebPay()
const dappAddress = 'n1ofWEvxMK2CpU3PTDCBNk5YaSzYthQdcbX'
// const myAccount = 'n1FQy3GYN6EbF5ajqScUjLH6zXBN5HW2Nx4'

/**
 * nebulas contract call
 * @param {String} callFunction contract function to call
 * @param {Array} params params to send
 * @param {Boolean} needPay if pay required
 */
function nebulasCall (callFunction, params = [], needPay) {
  return new Promise((resolve, reject) => {
    const to = dappAddress
    const value = '0'
    const callArgs = JSON.stringify(params)
    /**
     * 如果只查询类的请求 就不需要去支付 直接使用 nebPay 的 simulateCall 即可
     * 如果不是查询类的 需要调用支付接口 使用 nebPay 的 call 调用
     */
    const way = needPay ? 'call' : 'simulateCall'
    nebPay.simulateCall(to, value, callFunction, callArgs, {
      listener: (res) => {
        console.log('listener', res)
        try {
          resolve(JSON.parse(res.result))
        } catch (e) {
          reject(res.result)
        }
      }
    })
  })
}

export default nebulasCall
