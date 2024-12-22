import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getAllOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const orders = useSelector(getAllOrders);

  return <ProfileOrdersUI orders={orders} />;
};
