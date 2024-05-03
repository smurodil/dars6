import axios from "axios";

const productrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
    baseURL: productrl,
})

export const formatPrice = (price) => {
    const dollarAmout = new Intl.NumberFormat('en-US', {
        currency: "USD",
        style: "currency"
    }).format((price / 100).toFixed())

    return dollarAmout
}