import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const App = (props: Props) => {
  const { checked, onChange } = props;

  return (
    <div>
      <label
        className="flex space-x-4 p-5 cursor-pointer group/item hover:bg-neutral-20 transition-background rounded-lg flex-shrink-0"
      >
        <div className="h-[66px] flex justify-center">
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="dioa-checkbox__input"
          />
        </div>
        <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
          <div className="flex items-center text-base">
            <div className="flex w-[99px] h-[66px] relative flex-shrink-0 rounded-sm overflow-hidden">
              <a
                href="https://f.vjshi.com/foto/1293969?from=cart&fwd"
                target="_blank"
                className="outline-none inline-block w-full h-full"
              >
                <div className="foto-cover-card aspect-foto overflow-hidden">
                  <img
                    src="https://pp.vjshi.com/p/2024-08-16/7fbcb7a9d18243bba905b95061fe2065/main.jpg"
                    className="foto-cover-card__img w-full h-full object-cover bg-alpha-channel"
                    alt="国王费萨尔清真寺。沙迦."
                  />
                </div>
              </a>
            </div>
            <div className="flex space-y-3 flex-1 ml-3 flex-col overflow-hidden">
              <div className="flex flex-1">
                <a
                  href="https://f.vjshi.com/foto/1293969?from=cart&fwd"
                  target="_blank"
                  className="outline-none max-w-full text-lg text-black truncate h-6 font-medium"
                >
                  国王费萨尔清真寺。沙迦.
                </a>
              </div>
              <div className="w-full flex items-center space-x-3">
                <span className="text-neutral-60 truncate">ID：1293969</span>
                <hr
                  aria-orientation="vertical"
                  className="dioa-divider border-0 border-l border-current w-[1px] h-[12px] text-neutral-40"
                />
                <span className="text-neutral-60 truncate">类型：图片素材</span>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <button
              type="button"
              className="dioa-button__root appearance-none items-center justify-center select-none relative whitespace-nowrap transition outline-none cursor-pointer disabled:cursor-not-allowed text-base w-auto h-auto data-loading:text-transparent disabled:text-neutral-50 align-baseline border-0 text-black hover:text-black-50 active:text-black-50 hidden lg:block group-hover/item:block font-medium"
            >
              移除
            </button>
            <div className="flex items-center w-full justify-end">
              <div className="flex space-x-4 items-center text-base">
                <div className="flex text-neutral-60 flex-1">个人授权</div>
                <div className="flex items-center text-black flex-shrink-0 space-x-[2px]">
                  <span className="text-2xl font-medium">18</span>
                  <span className="leading-none pt-[9px] pb-[7px]">元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default App;