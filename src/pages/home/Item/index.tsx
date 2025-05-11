import { Checkbox } from 'antd';
import { LICENSE_TYPE_MAP } from '@/config';
import { TAB_TYPE_MAP, TabItem } from '../config';

interface Props {
  tabType: TabItem;
  checked: boolean;
  data: API.v1GetBuyerCartVideosReply | API.v1GetBuyerCartFotosReply | API.v1GetBuyerCartMusicsReply;
  isBought: boolean;
  onChange: (checked: boolean) => void;
  onRemove: () => void;
}

const App = (props: Props) => {
  const { checked, onChange, data, onRemove, isBought, tabType } = props;

  // 判断状态
  const isDisabled = data.auditStatus === 'FAIL';
  // 获取授权类型
  const licenseType = LICENSE_TYPE_MAP[data.licType];

  return (
    <div
      className={`
        group
        flex p-5 rounded-lg group/item transition
        hover:bg-neutral-100 border border-primary-100 bg-white shadow
      `}
    >
      <div className="flex items-center mr-4">
        <Checkbox
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={isDisabled}
        />
      </div>
      <div className="flex w-[99px] h-[66px] rounded-sm overflow-hidden flex-shrink-0">
        <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col ml-3 overflow-hidden">
        <div className="truncate">{data.title}</div>
        <div className="flex items-center space-x-3 mt-1 text-neutral-60 text-sm">
          {/* @ts-ignore 忽略提示吧 */}
          <span>ID：{data[TAB_TYPE_MAP[tabType.key].id]}</span>
          <span className="border-l border-neutral-40 h-3 mx-2"></span>
          {'softwareType' in data && <span>类型：{data.softwareType}</span>}
        </div>
        <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={onRemove}
              className="bg-neutral-20 text-neutral-80 rounded px-3 opacity-0 py-1 group-hover:opacity-100 transition"
            >
              移除
            </button>
          <div className="flex items-center space-x-2">
            <span className="text-neutral-60">{licenseType.label}</span>
            <span className={isDisabled || isBought ? 'text-2xl font-medium text-neutral-40' : 'text-2xl font-medium text-black'}>
              {data.price * licenseType.rate}
            </span>
            <span className={isDisabled || isBought ? 'text-base text-neutral-40' : 'text-base text-black'}>元</span>
          </div>
        </div>
        {isDisabled && <span className="text-neutral-40 text-sm mt-2">已下架</span>}
        {isBought && <div className="text-neutral-40 text-sm mt-2">您已购买过此素材</div>}
      </div>
    </div>
  );
};

export default App;