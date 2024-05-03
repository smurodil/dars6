import { useLoaderData, Link } from "react-router-dom"
import { formatPrice, customFetch } from '../utils'
import { useState } from "react"

export const loader = async ({ params }) => {
  const request = await customFetch(`/products/${params.id}`);
  return { product: request.data.data }
}

function SingleProduct() {
  const { product } = useLoaderData()
  const { image, title, price, description, colors, company } = product.attributes;
  const dollarAmount = formatPrice(price);
  const [ productColor, setProductColor ] = useState(colors[0]);
  return (
    <section className="align-content">
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products">
              Products
            </Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img src={image} alt={title} className="w-96 h-96 object-cover rounded-lg" />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="title-xl text-neutral-content font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">{dollarAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-2">
            {colors.map((color) => {
              return (
                <button className={`badge w-6 h-6 mr-2 ${
                  color == productColor && "border-2 border-secondary"
                }`} 
                style={{backgroundColor: color}}
                onClick={() => setProductColor(color)}
                ></button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct