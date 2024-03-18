import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserId } from "../features/user/userSlice";
import { fetchProducts } from "../features/product/productSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getUserId({}) as any).then((value: any) =>
      dispatch(fetchProducts(value.payload) as any)
    );
  }, [userId]);

  return { userId };
};

export default useUser;
