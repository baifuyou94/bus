import React, { useState, useCallback } from 'react';
import ShoppingIcon from './ShoppingIcon';
import { useGetAllData } from './hooks';
import { Drawer, Tabs, Checkbox, Button } from 'antd';
import Item from './Item';
// tab相关数据
import { TAB_TYPE, TAB_TYPE_MAP } from './config';

interface DataType {
  total?: number; // 购物车总数量
  CartVideos?: API.v1GetBuyerCartVideosReply[]; // 购物车视频列表
  CartFotos?: API.v1GetBuyerCartFotosReply[]; // 购物车照片列表
  CartMusicMusics?: API.v1GetBuyerCartMusicsReply[]; // 购物车音乐列表
  VideoDownloadLicTypesBought?: API.v1GetVideoDownloadLicTypesBoughtReply[]; // 视频购买历史
  FotoDownloadLicTypesBought?: API.v1GetFotoDownloadLicTypesBoughtReply[]; // 照片购买历史
  MusicDownloadLicTypesBought?: API.v1GetMusicDownloadLicTypesBoughtReply[]; // 音乐购买历史
  [key: string]: any;
}

// 购物车组件
export default function HomePage() {
  const data: DataType = useGetAllData();
  const total = data.total;

  // 生成tab列表 （tab 标签 + 数量）
  const tabTypes = useCallback(() => TAB_TYPE.map((item) => ({
    key: item.key,
    label: `${item.label} ${(data[item.dataKey as keyof DataType] || []).length}`
  })), [data])();

  // 当前tab
  const [tabType, setTabType] = useState<string>('1');
  // 当前tab对象
  const tabTypeObj = TAB_TYPE_MAP[tabType];
  // 购物车是否打开
  const [open, setOpen] = useState(true);
  // 关闭购物车
  const handleClose = () => {
    setOpen(false);
    setTabType('1');
    setChecked([]);
  };

  // 切换tab （切换tab 时，清空选中状态）
  const handleTabChange = (key: string) => {
    setTabType(key);
    setChecked([]);
  }
  // 当前tab下选中的id
  const [checked, setChecked] = useState<number[]>([]);

  // 选中状态改变
  const handleCheckChange = (id: number, checked: boolean) => {
    if (checked) {
      setChecked(prev => [...prev, id]);
    } else {
      setChecked(prev => prev.filter(item => item !== id));
    }
  };

  // 判断是否购买过
  const isBought = (id: number, licType: API.licTypes, data?: API.v1GetVideoDownloadLicTypesBoughtReply[] | API.v1GetFotoDownloadLicTypesBoughtReply[] | API.v1GetMusicDownloadLicTypesBoughtReply[]) => {
    let res = false;
    (data || []).forEach((item: any) => {
      // 1、用户购买过同类型时； 2、用户以前购买过企业PLUS，现又购买企业时（不包含个人）。
      if (
        item[tabTypeObj.id] === id && (item.licTypes.includes(licType) || (licType === 'LP' && item.licTypes.includes('LPPLUS')))
      ) {
        res = true;
      }
    });
    return res;
  };

  // 计算当前tab下所有item的id数组
  const getCurrentTabIds = () => {
    const currentTab = tabTypeObj;
    if (!currentTab) return [];
    return (data[currentTab.dataKey as keyof DataType] || [])
      .filter((item: any) => item.auditStatus === 'SUCCESS')
      .map((item: any) => item[currentTab.id]);
  };

  // 全选是否选中
  const isAllChecked = getCurrentTabIds().length > 0 && getCurrentTabIds().every((id: number) => checked.includes(id));

  // 全选切换
  const handleCheckAll = (value: boolean) => {
    const ids = getCurrentTabIds();
    if (value) {
      setChecked(ids);
    } else {
      setChecked([]);
    }
  };

  // 计算总价
  const getCheckedItems = () => {
    const currentTab = tabTypeObj;
    if (!currentTab) return [];
    return (data[currentTab.dataKey as keyof DataType] || [])
      .filter((item: any) => checked.includes(item[currentTab.id]));
  };
  const getItemPrice = (item: any) => {
    if (item.licType === 'NP') return item.price;
    if (item.licType === 'LP') return item.price * 4;
    if (item.licType === 'LPPLUS') return item.price * 10;
    return item.price;
  };
  const checkedItems = getCheckedItems();
  const checkedCount = checkedItems.length;
  const checkedTotal = checkedItems.reduce((sum: number, item: any) => sum + getItemPrice(item), 0);

  // 提交购买 打印日志
  const onSubmit = () => {
    console.log(`业务线：${tabTypeObj.label}，
                ids：${checkedItems.map((item: any) => (item as any)[TAB_TYPE_MAP[tabType as keyof typeof TAB_TYPE_MAP].id]).join('、')}，
                总计：${checkedTotal}元`);
  }

  // 移除 接口
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }
  return (
    <>
      <ShoppingIcon count={total} onClick={() => setOpen(true)}/>
      <Drawer
        onClose={handleClose}
        open={open}
        width={514}
        closable={false}
        styles={{
          header: {
            padding: "36px 40px 0 40px",
            border: "0",
          },
          body: {
            padding: "0",
          },
        }}
        title={
          <div className='flex justify-between h-[36px]'>
            <span className='font-[PingFang-SC] text-[24px] font-[500] text-[#0D0D0D]'>购物车</span>
            <svg onClick={handleClose} className='cursor-pointer' viewBox="0 0 24 24" width="28" height="28">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <line x1="7" y1="17" x2="17" y2="7"></line>
                </g>
              </svg>
          </div>
        }
      >
        <div className='flex flex-col h-full'>
          <div className='pt-[32px]'>
            <Tabs
              activeKey={tabType}
              items={tabTypes}
              className=' px-[40px]'
              onChange={handleTabChange}
              tabBarGutter={40}
              tabBarStyle={{
                // padding: "0 40px",
                
              }}
            />    
          </div>
          <div className='flex-1 overflow-y-auto px-[20px]'>
            <ul>
              {tabTypeObj && (data[tabTypeObj.dataKey as keyof DataType]?.length > 0 ? (
                data[tabTypeObj.dataKey as keyof DataType].map((item: any) => (
                  <li key={item[tabTypeObj.id]}>
                    <Item 
                      data={item} 
                      tabType={tabTypeObj}
                      checked={checked.includes(item[tabTypeObj.id])} 
                      isBought={isBought(
                        item[tabTypeObj.id], 
                        item.licType,
                        data[tabTypeObj.boughtKey as keyof DataType]
                      )}
                      onChange={(val) => handleCheckChange(item[tabTypeObj.id], val)} 
                      onRemove={handleRemove}
                    />
                  </li>
                ))
                // 没有数据时，显示图标
              ) : (
                <div style={{textAlign: 'center', marginTop: 60}}>
                  {/* 正常开发中，使用iconfont等字体图标。让ui统一管理 */}
                  <svg viewBox="0 0 80 80" width="24" height="24" className="w-20 h-20">
                    <rect width="80" height="80" fill="none" rx="0"></rect>
                    <rect width="20" height="14" x="15" y="21" fill="#EDEDED" rx="4"></rect>
                    <rect width="20" height="14" x="44" y="21" fill="#EDEDED" rx="4"></rect>
                    <rect width="49" height="14" x="15" y="45" fill="#EDEDED" rx="4"></rect>
                    <path fill="#CCC" d="M38.665 31v2q0 1.191-.571 2.237l-1.167-.638q.408-.747.408-1.599v-2h1.33Zm-4.353 6.655q-.156.01-.312.01h-3.727v-1.33H34q.112 0 .223-.007l.089 1.327Zm-8.039.01h-4v-1.33h4v1.33Zm-8.022-1.89q-.916-1.236-.916-2.775v-1.454h1.33V33q0 1.1.655 1.984l-1.07.792Zm-.916-8.229v-4h1.33v4h-1.33Zm1.64-8.097q1.307-1.114 3.025-1.114h1.18v1.33H22q-1.228 0-2.163.796l-.862-1.012Zm8.206-1.114h4v1.33h-4v-1.33Zm8.173.2q1.145.348 1.981 1.203.837.855 1.158 2.008l-1.28.357q-.23-.823-.829-1.435-.598-.611-1.416-.86l.386-1.272ZM38.665 23v4h-1.33v-4h1.33ZM60.665 55v2q0 1.191-.571 2.237l-1.167-.638q.408-.747.408-1.599v-2h1.33Zm-4.353 6.655q-.156.01-.312.01h-3.727v-1.33H56q.112 0 .223-.007l.089 1.327Zm-8.039.01h-4v-1.33h4v1.33Zm-8 0h-4v-1.33h4v1.33Zm-8 0h-4v-1.33h4v1.33Zm-8 0H22q-1.023 0-1.952-.428l.557-1.208q.664.306 1.395.306h2.273v1.33Zm-6.895-4.034q-.043-.314-.043-.631v-3.454h1.33V57q0 .226.03.45l-1.317.18Zm-.043-8.085V47q0-.858.305-1.66l1.243.473q-.218.574-.218 1.187v2.546h-1.33Zm3.717-7.114q.47-.097.948-.097h3.18v1.33H22q-.342 0-.677.07l-.27-1.303Zm8.129-.097h4v1.33h-4v-1.33Zm8 0h4v1.33h-4v-1.33Zm8 0h4v1.33h-4v-1.33Zm8 0H56q.692 0 1.354.2l-.386 1.274q-.473-.144-.968-.144h-2.82v-1.33Zm7.312 3.41q.172.616.172 1.255v4h-1.33v-4q0-.457-.123-.897l1.281-.357Z"></path>
                  </svg>
                  <div style={{marginTop: 20, color: '#666', fontSize: 28}}>暂无数据</div>
                </div>
              ))}
            </ul>
          </div>
          <hr className="border-0 border-b w-full h-[0px] text-[#F0F0F0]"></hr>
          <div className="flex flex-col h-[170px] opacity-100 flex flex-col justify-between py-[28px] px-[40px] bg-[#FEFEFE] z-10">
            <div className="flex relative justify-between items-center mb-4">
              <label className="flex items-center cursor-pointer select-none">
                <Checkbox checked={isAllChecked} onChange={(e) => handleCheckAll(e.target.checked)} className={""} />
                <span className="ml-2">全选</span>
              </label>
              <span>已选 {checkedCount} 件  总计：<span style={{color:'#FF3B30',fontSize:24}}>{checkedTotal}</span>
                <span>元</span>
              </span>
            </div>
            <button
              className="w-full h-[56px] rounded-[4px] bg-[#0D0D0D] text-[#fff] text-[16px] font-[500] rounded-[28px] hover:bg-[#0D0D0D] border-none"
              disabled={checkedCount === 0}
              onClick={onSubmit}
            >
              立即购买
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
