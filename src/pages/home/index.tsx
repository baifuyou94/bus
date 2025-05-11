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
    VideoDownloadLicTypesBought,
    FotoDownloadLicTypesBought,
    MusicDownloadLicTypesBought,
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
    setChecked([]);
  };

  const handleTabChange = (key: string) => {
    setTabType(key);
    setChecked([]);
  }

  const [checked, setChecked] = useState<number[]>([]);

  const handleCheckChange = (id: number, checked: boolean) => {
    if (checked) {
      setChecked(prev => [...prev, id]);
    } else {
      setChecked(prev => prev.filter(item => item !== id));
    }
  };

  // 判断是否购买过
  const isBought = (id: number, licType: API.licTypes,data?: API.v1GetVideoDownloadLicTypesBoughtReply[] | API.v1GetFotoDownloadLicTypesBoughtReply[] | API.v1GetMusicDownloadLicTypesBoughtReply[]) => {
    let res = false;
    (data || []).forEach(item => {
      let idOk = false;
      if (('vid' in item && item.vid === id) ||
        ('fid' in item && item.fid === id) ||
        ('mid' in item && item.mid === id)
      ) {
        idOk = true;
      }
      // 1、用户购买过同类型时； 2、用户以前购买过企业PLUS，现又购买企业时（不包含个人）。
      if (
        idOk && item.licTypes.includes(licType) || (licType === 'LP' && item.licTypes.includes('LPPLUS'))
      ) {
        res = true;
      }
    });
    return res;
  };

  // 计算当前tab下所有item的id数组
  const getCurrentTabIds = () => {
    if (tabType === '1') return (CartVideos || []).map(item => item.vid);
    if (tabType === '2') return (CartFotos || []).map(item => item.fid);
    if (tabType === '3') return (CartMusicMusics || []).map(item => item.mid);
    return [];
  };

  // 全选是否选中
  const isAllChecked = getCurrentTabIds().length > 0 && getCurrentTabIds().every(id => checked.includes(id));

  // 全选切换
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ids = getCurrentTabIds();
    if (e.target.checked) {
      setChecked(ids);
    } else {
      setChecked([]);
    }
  };

  // 计算总价
  const getCheckedItems = () => {
    if (tabType === '1') return (CartVideos || []).filter(item => checked.includes(item.vid));
    if (tabType === '2') return (CartFotos || []).filter(item => checked.includes(item.fid));
    if (tabType === '3') return (CartMusicMusics || []).filter(item => checked.includes(item.mid));
    return [];
  };
  const getItemPrice = (item: any) => {
    if (item.licType === 'NP') return item.price;
    if (item.licType === 'LP') return item.price * 4;
    if (item.licType === 'LPPLUS') return item.price * 10;
    return item.price;
  };
  const checkedItems = getCheckedItems();
  const checkedCount = checkedItems.length;
  const checkedTotal = checkedItems.reduce((sum, item) => sum + getItemPrice(item), 0);

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
                tabType === '1' && <ul>
                  {
                    CartVideos?.map((item) => (
                      <li key={item.vid}>
                        <Item 
                          data={item} 
                          checked={checked.includes(item.vid)} 
                          isBought={isBought(item.vid, item.licType,VideoDownloadLicTypesBought)}
                          onChange={(val) => handleCheckChange(item.vid, val)} 
                          onRemove={() => {}}
                        />
                      </li>
                    ))
                  }    
                </ul>
              }
              {
                tabType === '2' && <ul>
                  {
                    CartFotos?.map((item) => (
                      <li key={item.fid}>
                        <Item 
                          data={item} 
                          checked={checked.includes(item.fid)} 
                          isBought={isBought(item.fid, item.licType,FotoDownloadLicTypesBought)}
                          onChange={(val) => handleCheckChange(item.fid, val)} 
                          onRemove={() => {}}
                        />
                      </li>
                    ))
                  }    
                </ul>
              }
              {
                tabType === '3' && <ul>
                  {
                    CartMusicMusics?.map((item) => (
                      <li key={item.mid}>
                        <Item 
                          data={item} 
                          checked={checked.includes(item.mid)} 
                          isBought={isBought(item.mid, item.licType,MusicDownloadLicTypesBought)}
                          onChange={(val) => handleCheckChange(item.mid, val)} 
                          onRemove={() => {}}
                        />
                      </li>
                    ))
                  }    
                </ul>
              }
          </div>
          <hr className="border-0 border-b w-full h-[0px] text-[#F0F0F0]"></hr>
          <div className="flex flex-col h-[170px] opacity-100 flex flex-col py-[28px] px-[40px] bg-[#FEFEFE] z-10">
            <div className="flex relative justify-between items-center mb-4">
              <label className="flex items-center cursor-pointer select-none">
                <input type="checkbox" checked={isAllChecked} onChange={handleCheckAll} />
                <span className="ml-2">全选</span>
              </label>
              <span>已选 {checkedCount} 件  总计：<span style={{color:'#FF3B30',fontSize:24}}>{checkedTotal}</span><span style={{fontSize:16,verticalAlign:'top',marginLeft:2}}>元</span></span>
            </div>
            <button
              className="w-full h-12 rounded-lg text-white text-lg font-medium"
              style={{background: checkedCount === 0 ? '#ccc' : '#000', cursor: checkedCount === 0 ? 'not-allowed' : 'pointer'}}
              disabled={checkedCount === 0}
            >
              立即购买
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
