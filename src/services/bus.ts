import request from '@/utils/request';

export async function getBuyerCartVideos(
  options?: { [key: string]: any },
) {
  return request<API.v1GetBuyerCartVideosReply[]>('/vjh/buyer/cart/videos', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getBuyerCartFotos(
  options?: { [key: string]: any },
) {
  return request<API.v1GetBuyerCartFotosReply[]>('/vjf/buyer/cart/fotos', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getBuyerCartMusics(
  options?: { [key: string]: any },
) {
  return request<API.v1GetBuyerCartMusicsReply[]>('/vjn/cart/music/musics', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getVideoDownloadLicTypesBought(
  params: {
    vids: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.v1GetVideoDownloadLicTypesBoughtReply[]>('/vjn/video/download/lic-types-bought', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFotoDownloadLicTypesBought(
  params: {
    fids: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.v1GetFotoDownloadLicTypesBoughtReply[]>('/yjh/foto/download/lic-types-bought', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getMusicDownloadLicTypesBought(
  params: {
    mids: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.v1GetMusicDownloadLicTypesBoughtReply[]>('/yjh/music/download/lic-types-bought', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}