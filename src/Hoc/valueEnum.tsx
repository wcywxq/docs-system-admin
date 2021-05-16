import React from "react";
import { getTagList } from "../apis/tag";
import { message } from "antd";
import { getCategoryList } from "../apis/category";

type TypeEnumKey = 'tag' | 'category';

export type ValueEnumHocProps = Partial<{
  options: Record<TypeEnumKey, any[]>;
  request: Record<TypeEnumKey, () => Promise<void>>;
}>;

type ValueEnumHocState = {
  tagOptions: any[];
  categoryOptions: any[];
};

const valueEnumHoc = <T extends ValueEnumHocProps>(WrappedComponent: React.ComponentType<T>) => {
  return class extends React.Component<T, ValueEnumHocState> {
    constructor(props: T | Readonly<T>) {
      super(props);
      this.state = {
        tagOptions: [],
        categoryOptions: []
      };
    }

    async fetchTagList() {
      try {
        const response: any = await getTagList();
        if (response.resultCode !== 0) throw new Error(response.errorMsg);
        this.setState({
          tagOptions: response.data || []
        })
      } catch (err) {
        message.error('初始化标签数据失败');
        console.log(err)
      }
    }

    async fetchCategoryList() {
      try {
        const response: any = await getCategoryList();
        if (response.resultCode !== 0) throw new Error(response.errorMsg);
        console.log(this);
        this.setState({
          categoryOptions: response.data || []
        })
      } catch (err) {
        message.error('初始化分类数据失败');
        console.log(err)
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          options={{
            tag: this.state.tagOptions,
            category: this.state.categoryOptions
          }}
          request={{
            tag: () => this.fetchTagList(),
            category: () => this.fetchCategoryList()
          }}
        />
      );
    }
  }
}

export default valueEnumHoc;
