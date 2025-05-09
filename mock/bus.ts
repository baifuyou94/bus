export default {
  '/vjh/buyer/cart/videos': [
    {
      "auditStatus": "SUCCESS",
      "coverImage": "https://example.com/video1.jpg",
      "price": 99,
      "softwareType": "视频素材",
      "title": "高清风景视频素材",
      "licType": "MP",
      "vid": 12345
    },
    {
      "auditStatus": "FAIL",
      "coverImage": "https://example.com/video2.jpg",
      "price": 199,
      "softwareType": "AE模板",
      "title": "炫酷开场AE模板",
      "licType": "LP",
      "vid": 67890
    }
  ],

  '/vjf/buyer/cart/fotos': [
    {
      "auditStatus": "SUCCESS",
      "coverImage": "https://example.com/photo1.jpg",
      "price": 49,
      "softwareType": "图片素材",
      "title": "自然风光摄影",
      "licType": "MP",
      "fid": 54321
    },
    {
      "auditStatus": "SUCCESS",
      "coverImage": "https://example.com/photo2.jpg",
      "price": 79,
      "softwareType": "PSD模板",
      "title": "企业名片设计",
      "licType": "LPPLUS",
      "fid": 98765
    }
  ],

  '/vjn/cart/music/musics': [
    {
      "auditStatus": "SUCCESS",
      "coverImage": "https://example.com/music1.jpg",
      "price": 29,
      "title": "轻松背景音乐",
      "licType": "NP",
      "mid": 11223
    },
    {
      "auditStatus": "SUCCESS",
      "coverImage": "https://example.com/music2.jpg",
      "price": 59,
      "title": "史诗战斗音乐",
      "licType": "LP",
      "mid": 44556
    }
  ],

  '/vjn/video/download/lic-types-bought': [
    {
      "licTypes": ["LP", "LPPLUS"],
      "vid": 12345
    },
    {
      "licTypes": ["MP"],
      "vid": 67890
    }
  ],

  '/yjh/foto/download/lic-types-bought': [
    {
      "licTypes": ["LP"],
      "fid": 54321
    }
  ],

  '/yjh/music/download/lic-types-bought': [
    {
      "licTypes": ["NP", "LPPLUS"],
      "mid": 11223
    }
  ]
}