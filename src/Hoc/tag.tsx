import React from "react";
import { getTagList } from "../apis/tag";
import { message } from "antd";

type TagHocProps = {};

type TagHocState = {
  tagOptions: any[];
};

const tagHoc = <T extends TagHocProps>(WrappedComponent: React.ComponentType<T>) => {
  return class extends React.Component<T, TagHocState> {
    constructor(props: T | Readonly<T>) {
      super(props);
      this.state = {
        tagOptions: [],
      };
    }

    async componentDidMount() {
      await this.fetchTagList();
    }

    async fetchTagList() {
      try {
        const response: any = await getTagList();
        if (response.resultCode !== 0) throw new Error(response.errorMsg);
        this.setState({
          tagOptions: response.data || []
        })
      } catch (err) {
        message.error('初始化数据失败');
        console.log(err)
      }
    }

    render() {
      return <WrappedComponent {...this.props} tagOptions={this.state.tagOptions} />
    }
  }
}

export default tagHoc;
