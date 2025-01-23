import { SimpleGrid, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useApi from "../../hooks/useApi";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { VIEW_PRODUCTS } from "../../constants/AppUrls";
import AddProductForm from "../../components/product/AddProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const api = useApi();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      weight: "",
    },
  });

  const handleAddProduct = (values, _, isExit = false) => {
    console.log(isExit);

    api
      .post("/products", values)
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        form.reset();
        if (isExit) {
          navigate(VIEW_PRODUCTS);
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

  return (
    <>
      <Title order={2} mb={28}>
        Add product
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
        <AddProductForm form={form} onAdd={handleAddProduct} />
      </SimpleGrid>
    </>
  );
};

export default AddProduct;
