import { useState, useEffect } from "react";
import { message } from "antd";

type ResponseSelectType = {
  resultCode: number;
  errorMsg: string | null;
  data?: any[];
};

/**
 * @desc 异步获取可选项的 hook
 * @param request
 * @returns
 */
export function useSelect(request: () => Promise<any>) {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resultCode, errorMsg, data }: ResponseSelectType = await request();
        if (resultCode !== 0) {
          message.error(`初始化数据失败: ${errorMsg}`);
        } else {
          data && setOptions(data.map(item => ({ ...item, key: item._id })));
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, [request]);

  return { options };
}
