import api from './api';

export const createDonation = async (payload) => {
    console.log(payload);
  const { data } = await api.post(`/donation`, payload);
  console.log(data);
  return data;
};
export const captureDonation = async (orderId) => {
    const { data } = await api.post(`/donation/capture/${orderId}?method=paypal`);
    return data;
};