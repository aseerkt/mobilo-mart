import { serverApi } from '../fetcher';

export const addReview = (productId: string, payload) => {
  return serverApi.post(payload, `/api/products/${productId}/reviews`).json();
};

export const editReview = (productId: string, reviewId: string, payload) => {
  return serverApi
    .put(payload, `/api/products/${productId}/reviews/${reviewId}`)
    .json();
};

export const deleteReview = (productId: string, reviewId: string) => {
  return serverApi
    .delete(`/api/products/${productId}/reviews/${reviewId}`)
    .json();
};
