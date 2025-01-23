import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { VIEW_PRODUCTS } from "../../constants/AppUrls";
import { SimpleGrid, Title } from "@mantine/core";
import EditProductForm from "../../components/product/EditProductForm";
import { useEffect } from "react";

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const api = useApi();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      weight: "",
      isEnabled: false,
    },
  });

  useEffect(() => {
    api
      .get(`/products/${params.id}`)
      .then((res) => res.data)
      .then((res) => {
        const mappedData = Object.keys(form.getValues()).reduce(
          (prev, curr) => {
            prev[curr] = res.data[curr];
            return prev;
          },
          {}
        );

        form.setValues((prev) => ({ ...prev, ...mappedData }));
        form.resetDirty();
      })
      .catch((error) => {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleEditProduct = (values) => {
    if (!form.isDirty()) {
      notifications.show({ message: "Product updated" });
      navigate(VIEW_PRODUCTS);
      return;
    }

    api
      .patch(`/products/${params.id}`, values)
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        navigate(VIEW_PRODUCTS);
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

  return (
    <>
      <Title order={2} mb={28}>
        Edit product
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
        <EditProductForm form={form} onEdit={handleEditProduct} />
      </SimpleGrid>
    </>
  );
};

export default EditProduct;
