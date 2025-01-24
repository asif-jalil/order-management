import { SimpleGrid, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { VIEW_ORDER } from "../../constants/AppUrls";
import AddOrderForm from "../../components/Order/AddOrderForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import OrderItemsPreview from "../../components/Order/OrderItemsPreview";
import Summery from "../../components/Order/Summery";
import calculateDiscount from "../../utils/calculateDiscount";

const AddOrder = () => {
  const [productCache, setProductCache] = useState(new Map());
  const navigate = useNavigate();
  const api = useApi();
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const form = useForm({
    initialValues: {
      shippingAddress: "",
      promotionId: null,
      orderItems: [{ productId: "", quantity: null }],
    },
  });

  useEffect(() => {
    api
      .get("/promotions", { params: { filter: { isEnabled: true } } })
      .then((res) => res.data)
      .then((res) => {
        setPromotions(res.data.items);
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          message: error.response.data.message,
        });
      });
  }, []);

  const fetchProducts = useCallback(() => {
    api
      .get("/products", {
        params: { perPage: 20, search, filter: { isEnabled: true } },
      })
      .then((res) => res.data)
      .then((res) => {
        setProducts(res.data.items);
        setSearch("");
      })
      .catch((error) => {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleSearch = useDebouncedCallback(() => {
    fetchProducts();
  }, 800);

  const handleSearchOnChange = (value) => {
    setSearch(value);
    handleSearch();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = (values, _, isExit = false) => {
    api
      .post("/orders", {
        ...values,
        promotionId: Number(values.promotionId),
        orderItems: values.orderItems.map((item) => ({
          ...item,
          productId: Number(item.productId),
        })),
      })
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        form.reset();
        if (isExit) {
          navigate(VIEW_ORDER.replace(":id", res.data.id));
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          notifications.show({
            color: "red",
            message: error.response.data.message,
          });
        }
        form.setErrors(error.response.data);
      });
  };

  const totalDiscount = useMemo(
    () =>
      form.values.orderItems.reduce((acc, order) => {
        const product = productCache.get(Number(order.productId));
        if (!product) return acc;

        const promotion = promotions.find(
          (prom) => prom.id === Number(form.values.promotionId)
        );
        const basePrice = (product.price || 0) * (order.quantity || 0);
        const discount = calculateDiscount({
          promotion,
          weight: product.weight,
          quantity: order.quantity,
          basePrice,
        });

        return discount + acc;
      }, 0),
    [form.values]
  );

  const grandTotal = useMemo(
    () =>
      form.values.orderItems.reduce((acc, order) => {
        const product = productCache.get(Number(order.productId));
        if (!product) return acc;

        return (
          acc + (product.price || 0) * (order.quantity || 0) - totalDiscount
        );
      }, 0),
    [form.values]
  );

  return (
    <>
      <Title order={2} mb={28}>
        Add order
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
        <AddOrderForm
          form={form}
          onAdd={handleAddProduct}
          onSearch={handleSearchOnChange}
          products={products}
          promotions={promotions}
          setProductCache={setProductCache}
        />
        <OrderItemsPreview
          products={productCache}
          promotion={promotions.find(
            (prom) => prom.id === Number(form.values.promotionId)
          )}
          form={form}
        />
        <Summery data={{ grandTotal: grandTotal, discount: totalDiscount }} />
      </SimpleGrid>
    </>
  );
};

export default AddOrder;
