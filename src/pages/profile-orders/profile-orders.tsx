import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, getOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const orders = useSelector(getAllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
