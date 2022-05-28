import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { Product } from "../../models/product";
import { addBasketItemAsync, removeBasketItemAsync } from "../../slice/basketSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import httpClient from "../../utils/httpClient";

type Props = {};

const ProductDetail = (props: Props) => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (item) setQuantity(item.quantity);
        const result = await httpClient.Catalog.details(id!);
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, item]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  };

  const handleUpdateCart = () => {
    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updateQuantity }));
    } else {
      const updateQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updateQuantity }));
    }
  };

  if (loading) return <Loading />;

  if (!product) return <h3>Not found.</h3>;

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                label="Quantity in Cart"
                fullWidth
                value={quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={item?.quantity === quantity || (!item && quantity === 0)}
                onClick={handleUpdateCart}
                loading={status.includes("pending")}
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
              >
                {item ? "Update Quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetail;
