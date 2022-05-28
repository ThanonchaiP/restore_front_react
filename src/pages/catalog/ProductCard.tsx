import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync } from "../../slice/basketSlice";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{
            sx: { fontWeight: "bold" },
            color: "primary.main",
          }}
          avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{product.name.charAt(0).toUpperCase()}</Avatar>}
          title={product.name}
        />

        <CardMedia
          component="img"
          image={product.pictureUrl}
          loading="lazy"
          sx={{ width: 140, height: 140, margin: "auto", bgcolor: "primary.light" }}
          alt=""
          title={product.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={status.includes("pending" + product.id)}
            size="small"
            onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
          >
            Add to cart
          </Button>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
