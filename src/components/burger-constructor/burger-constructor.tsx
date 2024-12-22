import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  constructorItemsSelector
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger, clearOrder } from '../../services/slices/newOrder';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector(constructorItemsSelector);
  const orderRequest = useSelector((state) => state.addBurder.orderRequest);
  const dispatch = useDispatch();
  const orderModalData = useSelector((state) => state.addBurder.orderModalData);
  const navigate = useNavigate();
  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients
    }),
    [bun, ingredients]
  );

  const onOrderClick = useCallback(() => {
    if (!bun || orderRequest) return;
    const orderIngredients = [
      bun?._id,
      ...ingredients.map((item) => item._id),
      bun?._id
    ];

    dispatch(orderBurger(orderIngredients));
  }, [bun, orderRequest, ingredients, dispatch]);

  const closeOrderModal = useCallback(() => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  }, [dispatch, navigate]);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
