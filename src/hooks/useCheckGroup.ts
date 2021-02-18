import { useState } from "react";
import { CheckboxOptionType } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

/**
 * @description checkbox 群组控制，包括全选和反选等功能
 */
export default function useCheckGroup(checkOptions: Array<CheckboxOptionType>) {
  const [indeterminate, setIndeterminate] = useState(false); // 不确定状态
  const [checkAll, setCheckAll] = useState(false); // 是否全部选中
  const [checkList, setCheckList] = useState<any[]>([]); // 选中的列表项

  /**
   * @description 全选和反选的监听
   */
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setIndeterminate(false);
    // 是否全选的控制
    setCheckAll(e.target.checked);
    setCheckList(e.target.checked ? checkOptions.map((item) => item.value) : []);
  };

  /**
   * @description 子项选择的监听
   */
  const onCheckChange = (checkedValue: CheckboxValueType[]) => {
    setIndeterminate(!!checkedValue.length && checkedValue.length < checkOptions.length);
    // 是否全选的控制
    setCheckAll(checkedValue.length === checkOptions.length);
    setCheckList(checkedValue);
  };

  return {
    indeterminate,
    checkAll,
    checkList,
    onCheckAllChange,
    onCheckChange,
  };
}
