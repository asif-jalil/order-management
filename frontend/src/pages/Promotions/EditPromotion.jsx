import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { VIEW_PROMOTIONS } from "../../constants/AppUrls";
import { SimpleGrid, Title } from "@mantine/core";
import EditPromotionForm from "../../components/promotion/EditPromotionForm";
import moment from "moment";

const EditPromotion = () => {
  const navigate = useNavigate();
  const params = useParams();
  const api = useApi();
  const form = useForm({
    initialValues: {
      title: "",
      startsAt: null,
      endsAt: null,
      isEnabled: false,
    },
  });

  useEffect(() => {
    api
      .get(`/promotions/${params.id}`)
      .then((res) => res.data)
      .then((res) => {
        const mappedData = Object.keys(form.getValues()).reduce(
          (prev, curr) => {
            prev[curr] = res.data[curr];
            return prev;
          },
          {}
        );

        form.setValues((prev) => ({
          ...prev,
          ...mappedData,
          startsAt: moment(res.data.startsAt),
          endsAt: moment(res.data.endsAt),
        }));
        form.resetDirty();
      })
      .catch((error) => {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleEditPromotion = (values) => {
    if (!form.isDirty()) {
      notifications.show({ message: "Promotion updated" });
      navigate(VIEW_PROMOTIONS);
      return;
    }

    api
      .patch(`/promotions/${params.id}`, values)
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        navigate(VIEW_PROMOTIONS);
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
        Edit promotion
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
        <EditPromotionForm form={form} onEdit={handleEditPromotion} />
      </SimpleGrid>
    </>
  );
};

export default EditPromotion;
