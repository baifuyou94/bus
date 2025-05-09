// 购物车icon
import { ShoppingCartOutlined } from '@ant-design/icons'; 

export default function ShoppingIcon({ count = 0, onClick=() => {} }) {
  return (
    <div onClick={onClick} className="fixed right-[12px] bottom-[100px] flex-center transition-all w-[54px] h-[54px]
    rounded-[100%] shadow-[0_4px_10px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-[#f5f5f5] border-solid border-[#fff] border">
      {/* 先试用antd 的图标，正常开发中，使用iconfont等字体图标。让ui统一管理 */}
       <ShoppingCartOutlined className="text-[22px]"/>
       {
        count > 0 && <div className="flex-center absolute top-0 right-0 w-[28px] h-[28px] text-[12px] text-white rounded-[14px] bg-[#0071E3]">
          {count > 999 ? '999+' : count}
        </div>
       }
    </div>
  );
}
