import { FIXED, PERCENTAGE, WEIGHTED } from "../constants/PromotionTypes";

const calculateDiscount = ({ promotion, weight, quantity, basePrice }) => {
  if (!promotion) {
    return 0;
  }
  if (promotion && promotion.type === PERCENTAGE) {
    return (basePrice * promotion.promotionDiscount[0].discount) / 100;
  }
  if (promotion && promotion.type === FIXED) {
    return promotion.promotionDiscount[0].discount;
  }
  if (promotion && promotion.type === WEIGHTED) {
    const totalWeight = weight * quantity;
    const slab = promotion.promotionDiscount.find(
      (s) =>
        totalWeight >= (s.minQuantity || 0) &&
        (s.maxQuantity === null || totalWeight <= s.maxQuantity)
    );
    if (slab) {
      return (slab.discount * totalWeight) / weight || 0;
    }
  }

  return 0;
};

export default calculateDiscount;
