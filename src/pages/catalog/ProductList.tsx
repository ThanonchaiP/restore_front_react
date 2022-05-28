import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
