import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, getFeeds } from '../../services/slices/feeds';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);
  const update = () => {
    dispatch(getFeeds());
  };
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(update);
      }}
    />
  );
};
