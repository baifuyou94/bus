import { useCallback, useEffect } from 'react';
import { useRequest } from 'ahooks';
import {
  getBuyerCartVideos,
  getBuyerCartFotos,
  getBuyerCartMusics,
  getVideoDownloadLicTypesBought,
  getFotoDownloadLicTypesBought,
  getMusicDownloadLicTypesBought,
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
    
  // 视频购买历史
  const { data: VideoDownloadLicTypesBought, run: runVideoDownloadLicTypesBought } = useRequest((vids: number[]) => getVideoDownloadLicTypesBought({ vids }), {
    manual: true,
  });
  // 图片购买历史
  const { data: FotoDownloadLicTypesBought, run: runFotoDownloadLicTypesBought } = useRequest((fids: number[]) => getFotoDownloadLicTypesBought({ fids }), {
    manual: true,
  });
  // 音乐购买历史
  const { data: MusicDownloadLicTypesBought, run: runMusicDownloadLicTypesBought } = useRequest((mids: number[]) => getMusicDownloadLicTypesBought({ mids }), {
    manual: true,
  }); 

  useEffect(() => {
    if (CartVideos?.length) {
      runVideoDownloadLicTypesBought(CartVideos?.map(item => item.vid));
    }
  }, [CartVideos]);

  useEffect(() => {
    if (CartFotos?.length) {
      runFotoDownloadLicTypesBought(CartFotos?.map(item => item.fid));
    }
  }, [CartFotos]);    

  useEffect(() => {
    if (CartMusicMusics?.length) {
      runMusicDownloadLicTypesBought(CartMusicMusics?.map(item => item.mid));
    }
  }, [CartMusicMusics]);
  
  return {
    CartVideos,
    CartFotos,
    CartMusicMusics,
    total,
    VideoDownloadLicTypesBought,
    FotoDownloadLicTypesBought,
    MusicDownloadLicTypesBought,
  }
};

export {
  useGetAllData,
}