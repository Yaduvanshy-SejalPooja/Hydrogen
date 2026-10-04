import {useLoaderData} from '@shopify/remix-oxygen';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
    // Pass a `cache` option with your query to customize API request caching.
    cache: storefront.CacheLong()
  });
  return {product};
}

export default function Product() {
  const {product} = useLoaderData();
  return (
    <h1>{product.title}</h1>
  )
}

const PRODUCT_QUERY = `#graphql
  product(handle: $handle) {
    id
    title
    
  }`