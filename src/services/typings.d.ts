// API 命名空间定义
declare namespace API {
  type licTypes = 'NP' | 'LP' | 'LPPLUS';
  type auditStatus = 'SUCCESS' | 'FAIL';
  // 视频购物车返回类型
  interface v1GetBuyerCartVideosReply {
    auditStatus: auditStatus;
    coverImage: string;
    price: number;
    softwareType: '视频素材' | 'AE模板' | 'C40模板';
    title: string;
    licType: licTypes;
    vid: number;
  }

  // 图片购物车返回类型
  interface v1GetBuyerCartFotosReply {
    auditStatus: auditStatus;
    coverImage: string;
    price: number;
    softwareType: '图片素材' | 'AI模板' | 'PSD模板';
    title: string;
    licType: licTypes;
    fid: number;
  }

  // 音乐购物车返回类型
  interface v1GetBuyerCartMusicsReply {
    auditStatus: auditStatus;
    coverImage: string;
    price: number;
    title: string;
    licType: licTypes;
    mid: number;
  }

  // 视频购买历史返回类型
  interface v1GetVideoDownloadLicTypesBoughtReply {
    licTypes: licTypes[];
    vid: number;
  }

  // 图片购买历史返回类型
  interface v1GetFotoDownloadLicTypesBoughtReply {
    licTypes: licTypes[];
    fid: number;
  }

  // 音乐购买历史返回类型
  interface v1GetMusicDownloadLicTypesBoughtReply {
    licTypes: licTypes[];
    mid: number;
  }
}