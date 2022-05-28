import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import httpClient from "../../utils/httpClient";
import ProductList from "./ProductList";

type Props = {};

const Catalog = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const result = await httpClient.Catalog.list();
      setProducts(result.data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
