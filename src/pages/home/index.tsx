
import React, { useState, useCallback } from 'react';
import ShoppingIcon from './ShoppingIcon';
import { useGetAllData } from './hooks';
import { Drawer, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Item from './Item';

export default function HomePage() {
  // 正确的开发逻辑，total数据单独获取。购物车里面的列表数据，在打开抽屉时候获取。
  // 这里因为没有找到total接口，所以直接获取。
  const {
    total,
    CartVideos,
    CartFotos,
    CartMusicMusics,
  } = useGetAllData();

  const tabTypes = useCallback(() => [
    { key: '1', label: `视频 ${CartVideos?.length}` },
    { key: '2', label: `照片 ${CartFotos?.length}` },
    { key: '3', label: `音乐 ${CartMusicMusics?.length}` },
  ], [CartVideos, CartFotos, CartMusicMusics])();

  const [tabType, setTabType] = useState<string>('1');

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTabType('1');
  };

  const handleTabChange = (key: string) => {
    setTabType(key);
  }

  const [checked, setChecked] = useState(false);

  return (
    <>
      <ShoppingIcon count={total} onClick={() => setOpen(true)}/>
      <Drawer
        onClose={handleClose}
        open={open}
        width={514}
        closable={false}
        title={
          <div className='flex justify-between'>
            <span>22222</span>
            <CloseOutlined onClick={handleClose}/>
          </div>
        }
      >
        <div className='flex flex-col h-full'>
          <Tabs
            activeKey={tabType}
            items={tabTypes}
            onChange={handleTabChange}
          />  
          <div className='flex-1'>
              {
                tabType === '1' && <div>
                  <Item checked={checked} onChange={(val) => setChecked(val)}/>
                </div>
              }
              {
                tabType === '2' && <div>照片</div>
              }
              {
                tabType === '3' && <div>音乐</div>
              }
          </div>
          <hr className="border-0 border-b w-full h-[0px] text-[#F0F0F0]"></hr>
          <div className="flex flex-col h-[170px] opacity-100 flex flex-col py-[28px] px-[40px] bg-[#FEFEFE] z-10">
            <div className="flex relative justify-between">
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
