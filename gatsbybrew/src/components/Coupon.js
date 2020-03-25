import Cookies from "universal-cookie"
import { parseLocation } from "../common"

// const cookies = new Cookies()

const DEFAULT_COOKIE_PARAMS = {
  maxAge: 365 * 24 * 60 * 60,
  path: "/",
}

const intTo_ = (d_, a, b, c) => {
  var word = ""
  var d = d_ % 10
  if (d === 0 || d >= 5 || (d_ >= 11 && d_ <= 14)) {
    word = a
  } else if (d === 1) {
    word = b
  } else {
    word = c
  }
  return d_.toFixed(0) + " " + word
}

const intToHoursStr = d => {
  return intTo_(d, "часов", "час", "часа")
}

const timedeltaToHours = timedelta =>
  parseInt(Math.round(timedelta / (60 * 60 * 1000)))

// function addDays(date, days) {
//   var result = new Date(date)
//   result.setDate(result.getDate() + days)
//   return result
// }

function addHours(date, hours) {
  var result = new Date(date)
  result.setTime(result.getTime() + hours * 60 * 60 * 1000)
  return result
}

const couponCookieName = (product, promocode) =>
  `flb_${product.pid}_${promocode}`

const saveCoupon = (product, promocode, coupon) => {
  const cookies = new Cookies()
  product &&
    promocode &&
    coupon &&
    cookies.set(
      couponCookieName(product, promocode),
      coupon,
      DEFAULT_COOKIE_PARAMS
    )
}

const expireCoupon = (product, promocode) => {
  const promocode2 = promocode || fetchActivePromocode(product)

  const cookies = new Cookies()
  const coupon = cookies.get(couponCookieName(product, promocode2)) || {}

  saveCoupon(product, promocode2, {
    ...coupon,
    expiration: new Date(1980, 1, 1),
  })
}

const fetchCouponByPromocode = (product, promocode) => {
  if (!promocode) {
    return null
  }

  const cookies = new Cookies()
  const coupon = cookies.get(couponCookieName(product, promocode))

  if (coupon) {
    return {
      ...coupon,
      expiration: new Date(coupon.expiration),
    }
  }

  const generateCoupon = (product, promocode) => {
    switch (product.pid) {
      case "flowbrew60":
        switch (promocode) {
          case "FLB10":
          case "FB10":
          case "GIFT10":
          case "WELCOME10":
            return { discount: 0.1, expiration: addHours(new Date(), 2) }
          case "FLOW15":
            return { discount: 0.15 }
          default:
            break
        }
        break
      default:
        break
    }
    return null
  }

  const newCoupon = generateCoupon(product, promocode)

  if (!newCoupon) {
    return null
  }

  saveCoupon(product, promocode, newCoupon)

  return newCoupon
}

const activePromocodeCookieName = product => `flb_promocode_of_${product.pid}`

const fetchActivePromocode = product => {
  if (!product) {
    return null
  }
  const cookies = new Cookies()
  return cookies.get(activePromocodeCookieName(product))
}

const setActivePromocode = (product, promocode) => {
  const cookies = new Cookies()
  cookies.set(
    activePromocodeCookieName(product),
    promocode,
    DEFAULT_COOKIE_PARAMS
  )
}

const makeCouponDescription = coupon => {
  if (!coupon) {
    return ""
  }

  const base = `Скидка ${(coupon.discount * 100).toFixed(0)}%`

  if (!coupon.expiration || coupon.expiration < new Date()) {
    return base
  }

  const h = intToHoursStr(timedeltaToHours(coupon.expiration - new Date()))
  return base + ` действительна ${h}`
}

const fetchCoupon = product => {
  const promocode = fetchActivePromocode(product)
  const coupon = fetchCouponByPromocode(product, promocode)

  return (
    coupon && {
      ...coupon,
      description: makeCouponDescription(coupon),
      promocode: promocode,
    }
  )
}

const applyCoupon = product => {
  const coupon = fetchCoupon(product)

  if (!coupon) {
    return product
  }

  if (coupon.expiration && coupon.expiration < new Date()) {
    return product
  }

  return {
    ...product,
    price: product.price * (1.0 - coupon.discount),
    old_price: product.price,
    old_price_description: coupon.description,
    promocode: coupon.promocode,
  }
}

const visitHistory = location => {
  const cookies = new Cookies()
  const cookieName = `visit_history`

  const history = cookies.get(cookieName) || {}
  const key = location.pathname.replace(/(\w)\/$/, "$1")

  const newHistory = {
    ...history,
    [key]: (history[key] || 0) + 1,
  }

  cookies.set(cookieName, newHistory, DEFAULT_COOKIE_PARAMS)

  return newHistory
}

const usePromotion = (product, location) => {
  var history = visitHistory(location)

  const hasActiveCoupon = applyCoupon(product).promocode
  const everPurchased = (history[encodeURI("/спасибо")] || 0) > 0

  if (!hasActiveCoupon && !everPurchased) {
    if (history["/"] === 2 || history["/checkout"] === 1) {
      setActivePromocode(product, "WELCOME10")
    }
  }

  const query = parseLocation(location)

  if (query.code) {
    setActivePromocode(product, query.code.toUpperCase())
  }
}

export {
  applyCoupon,
  setActivePromocode,
  fetchActivePromocode,
  expireCoupon,
  usePromotion,
}
