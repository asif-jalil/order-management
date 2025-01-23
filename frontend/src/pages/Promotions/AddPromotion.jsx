import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { VIEW_PROMOTIONS } from "../../constants/AppUrls";
import { Grid, Title } from "@mantine/core";
import AddPromotionForm from "../../components/promotion/AddPromotionForm";

const AddPromotion = () => {
  const navigate = useNavigate();
  const api = useApi();
  const form = useForm({
    initialValues: {
      title: "",
      type: null,
      startsAt: null,
      endsAt: null,
      discounts: [{ minQuantity: null, maxQuantity: null, discount: null }],
    },
  });

  const handleAddPromotion = (values, _, isExit) => {
    api
      .post("/promotions", values)
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        form.reset();
        if (isExit) {
          navigate(VIEW_PROMOTIONS);
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
        Add promotion
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 7, lg: 6, xl: 5 }}>
          <AddPromotionForm form={form} onAdd={handleAddPromotion} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default AddPromotion;
