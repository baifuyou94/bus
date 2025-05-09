import { useCallback } from 'react';
import { useRequest } from 'ahooks';
import {
  getBuyerCartVideos,
  getBuyerCartFotos,
  getBuyerCartMusics,
} from '@/services/bus';

const useGetAllData = () => {
  const { data: CartVideos } = useRequest(() => getBuyerCartVideos());
  const { data: CartFotos } = useRequest(() => getBuyerCartFotos());
  const { data: CartMusicMusics } = useRequest(() => getBuyerCartMusics());

  // 按开发逻辑，这里total数据应该是单独的接口。不应该在业务层计算。
  const total = useCallback(() => {
    const dataArrays = [CartVideos, CartFotos, CartMusicMusics];
    return dataArrays.reduce((sum, arr) => sum + (arr || []).length, 0);
  },[CartVideos,CartFotos,CartMusicMusics])();
    
  return {
    CartVideos,
    CartFotos,
    CartMusicMusics,
    total,
  }
};

export {
  useGetAllData,
}