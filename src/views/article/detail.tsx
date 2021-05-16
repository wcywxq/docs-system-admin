import React, { FC, useEffect, useState } from "react";
import type { Key } from 'react';
import { Spin, Card, message } from "antd";
import type { RouteComponentProps } from "react-router-dom";
import { getArticleById } from "../../apis/article";
import RenderMarkdown from "../../components/RenderMarkdown";

type Params = {
  id: string;
};

type IProps = RouteComponentProps<Params> & {};

type IState = {
  loading: boolean;
  content: string;
};

export default class ArticleDetail extends React.Component<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      loading: false,
      content: ''
    };
  }

  async componentDidMount() {
    await this.fetchList(this.props.match.params.id);
  }

  async fetchList(id: Key) {
    this.setState({ loading: true });
    try {
      const response: any = await getArticleById({ id });
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      this.setState({ content: response.data.content });
    } catch (err) {
      message.error('获取内容失败');
      console.log(err)
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <Spin tip="Loading..." spinning={this.state.loading}>
      <Card bodyStyle={{ minHeight: "calc(100vh - 64px)" }}>
        <RenderMarkdown content={this.state.content} />
      </Card>
    </Spin>
  }
}

