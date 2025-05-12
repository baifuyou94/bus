import { Checkbox } from 'antd';
import { LICENSE_TYPE_MAP } from '@/config';
import { TAB_TYPE_MAP, TabItem } from '../config';

interface Props {
  tabType: TabItem;
  checked: boolean;
  data: API.v1GetBuyerCartVideosReply | API.v1GetBuyerCartFotosReply | API.v1GetBuyerCartMusicsReply;
  isBought: boolean;
  onChange: (checked: boolean) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const App = (props: Props) => {
  const { checked, onChange, data, onRemove, isBought, tabType } = props;

  // 判断状态
  const isDisabled = data.auditStatus === 'FAIL';
  // 获取授权类型
  const licenseType = LICENSE_TYPE_MAP[data.licType];

  return (
    <div
      className={`flex flex-col group hover:bg-[#F5F5F5] p-[20px] rounded-[12px] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => {
        if (isDisabled) return;
        onChange(!checked)
      }}
    >
      <div
      className={`
        flex group/item transition items-center
      `}
    >
      <div className="flex-center w-[20px] h-[20px] mr-[16px]">
        <Checkbox
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={isDisabled}
        />
      </div>
      <div className="flex w-[117px] h-[66px] rounded-[4px] overflow-hidden flex-shrink-0 relative">
        {isDisabled && <span className="text-[14px] bg-[rgba(13,13,13,0.5)] font-medium text-[#fff] absolute left-[0] top-[0] w-full h-full flex-center">已下架</span>}
        <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col h-[66px] justify-center ml-[12px] overflow-hidden">
        <div className="text-[16px] font-medium text-black leading-[24px] overflow-hidden text-ellipsis whitespace-nowrap">{data.title}</div>
        <div className="flex items-center mt-[12px] text-gray text-[14px] leading-[22px]">
          {/* @ts-ignore 忽略提示吧 */}
          <span>ID：{data[TAB_TYPE_MAP[tabType.key].id]}</span>
          <span className="border-l border-[#404040] h-3 mx-[12px]"></span>
          {'softwareType' in data && <span>类型：{data.softwareType}</span>}
        </div>
      </div> 
    </div>
    {isBought && <div className="text-gray text-[14px] mt-[12px] pl-[36px] flex items-center leading-[22px]">
      <span>您已购买过此素材</span>
      <svg fill="none" version="1.1" width="16" height="16" viewBox="0 0 16 16" className="translate-y-[1px]">
        <g>
          <g>
            <rect x="0" y="0" width="16" height="16" rx="0" fillOpacity="1"/>
          </g>
          <g transform="matrix(0,-1,-1,0,22,22)">
            <path d="M14,12.942809L17.5286,16.4714L17.52977,16.47023Q17.62331,16.563760000000002,17.74552,16.61438Q17.86772,16.665,18,16.665Q18.0655,16.665,18.129730000000002,16.65222Q18.19397,16.63944,18.25448,16.61438Q18.31499,16.58931,18.36945,16.55293Q18.42391,16.51654,18.47023,16.47023Q18.51654,16.42391,18.55293,16.36945Q18.589309999999998,16.315,18.61438,16.25448Q18.63944,16.19397,18.65222,16.129730000000002Q18.665,16.0655,18.665,16Q18.665,15.86772,18.61438,15.745519999999999Q18.563760000000002,15.62331,18.47023,15.52977L18.4714,15.5286L14.4714,11.528595Q14.42497,11.482166,14.37038,11.445687Q14.31578,11.409208,14.25512,11.38408Q14.19446,11.358953,14.13006,11.346143Q14.065660000000001,11.333333,14,11.333333Q13.93434,11.333333,13.86994,11.346143Q13.80554,11.358953,13.74488,11.38408Q13.68421,11.409208,13.62962,11.445687Q13.57502,11.482166,13.5286,11.528595L9.528595,15.5286L9.529774,15.52977Q9.43624,15.62331,9.38562,15.745519999999999Q9.335,15.86772,9.335,16Q9.335,16.0655,9.347778,16.129730000000002Q9.360556,16.19397,9.38562,16.25448Q9.410685,16.315,9.447073,16.36945Q9.483461,16.42391,9.529774,16.47023Q9.576087,16.51654,9.630546,16.55293Q9.685004,16.58931,9.745516,16.61438Q9.806027,16.63944,9.870265,16.65222Q9.9345032,16.665,10,16.665Q10.132277,16.665,10.254484,16.61438Q10.376692,16.563760000000002,10.470226,16.47023L10.471405,16.4714L14,12.942809Z" fillRule="evenodd" fill="#404040" fillOpacity="1"/>
          </g>
        </g>
      </svg>
    </div>}
    <div className="flex justify-between items-center mt-[12px] h-[30px]">
      <button
        type="button"
        onClick={onRemove}
        className="text-black text-[14px] font-medium pl-[36px] opacity-0 group-hover:opacity-100 transition hover:text-[#0d0d0d80]"
      >
        移除
      </button>
      <div className="flex items-center">
        <span className="text-gray text-[14px]">{licenseType.label}</span>
        <span className="text-[20px] font-medium text-black ml-[16px]">
          {data.price * licenseType.rate}
        </span>
        <span className="text-[14px] text-black ml-[2px] translate-y-[1px]">元</span>
      </div>
    </div>
  </div>
  );
};

export default App;