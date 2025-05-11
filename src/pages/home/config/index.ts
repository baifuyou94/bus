interface TabItem {
    key: string; // 唯一标识
    label: string; // 标签
    id: string; // tab 类型，对应的 id 数据类型：vid、fid、mid。 用于取值
    dataKey: string; // 数据key
    boughtKey: string; // 购买历史key
}
  
  const TAB_TYPE: TabItem[] = [
    {
      key: '1',
      label: '视频',
      id: 'vid',
      dataKey: 'CartVideos',
      boughtKey: 'VideoDownloadLicTypesBought',
    },
    {
      key: '2',
      label: '照片',
      id: 'fid',
      dataKey: 'CartFotos',
      boughtKey: 'FotoDownloadLicTypesBought',
    },
    {
      key: '3',
      label: '音乐',
      id: 'mid',
      dataKey: 'CartMusicMusics',
      boughtKey: 'MusicDownloadLicTypesBought',
    },
  ];
  
  // tab 类型 键值对，用于快速查找
  const TAB_TYPE_MAP: Record<string, TabItem> = {};
  
  TAB_TYPE.forEach((item) => {
    TAB_TYPE_MAP[item.key] = item;
  });

  export { TAB_TYPE, TAB_TYPE_MAP, TabItem };