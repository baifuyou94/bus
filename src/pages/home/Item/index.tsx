import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { LICENSE_TYPE_OBJ } from '@/config';

interface Props {
  checked: boolean;
  data: API.v1GetBuyerCartVideosReply | API.v1GetBuyerCartFotosReply | API.v1GetBuyerCartMusicsReply;
  isBought: boolean;
  onChange: (checked: boolean) => void;
  onRemove: () => void;
}

const App = (props: Props) => {
  const { checked, onChange, data, onRemove, isBought } = props;
  const [hover, setHover] = useState(false);

  // 判断状态
  // const isDisabled = data.status === 'disabled';
  const isDisabled = false;
  const isRepeat = false;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        flex p-5 rounded-lg group/item transition
        ${isDisabled || isBought ? 'bg-neutral-50 opacity-60 cursor-not-allowed' : hover ? 'bg-neutral-100 border border-primary-100' : 'bg-white shadow'}
      `}
    >
      <div className="flex items-center mr-4">
        <Checkbox
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={isDisabled || isBought}
          className={hover && !isDisabled && !isBought ? 'border-primary-100' : ''}
        />
      </div>
      <div className="flex w-[99px] h-[66px] rounded-sm overflow-hidden flex-shrink-0">
        <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col ml-3 overflow-hidden">
        <div className="truncate">{data.title}</div>
        <div className="flex items-center space-x-3 mt-1 text-neutral-60 text-sm">
          <span>ID：{
            'vid' in data ? data.vid :
            'fid' in data ? data.fid :
            'mid' in data ? data.mid : ''
          }</span>
          <span className="border-l border-neutral-40 h-3 mx-2"></span>
          {'softwareType' in data && <span>类型：{
            data.softwareType
          }</span>}
        </div>
        <div className="flex justify-between items-center mt-3">
          {hover && !isDisabled && !isRepeat && (
            <button
              type="button"
              onClick={onRemove}
              className="bg-neutral-20 text-neutral-80 rounded px-3 py-1 hover:bg-neutral-40 transition"
            >
              移除
            </button>
          )}
          <div className="flex items-center space-x-2">
            <span className="text-neutral-60">{LICENSE_TYPE_OBJ[data.licType]}</span>
            <span className={isDisabled || isRepeat ? 'text-2xl font-medium text-neutral-40' : 'text-2xl font-medium text-black'}>
              {data.price * {'NP': 1, 'LP': 4, 'LPPLUS': 10}[data.licType]}
            </span>
            <span className={isDisabled || isRepeat ? 'text-base text-neutral-40' : 'text-base text-black'}>元</span>
          </div>
        </div>
        {isDisabled && <span className="text-neutral-40 text-sm mt-2">已下架</span>}
        {isRepeat && <div className="text-neutral-40 text-sm mt-2">您已购买过此素材</div>}
      </div>
    </div>
  );
};

export default App;