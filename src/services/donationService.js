import api from './api';

export const createDonation = async (payload) => {
    console.log(payload);
  const { data } = await api.post(`/donation`, payload);
  console.log(data);
  return data;
};
