import React from "react";
import { Col, Dropdown, Menu, Row, Space, Tooltip } from "antd";
import {
  AlignLeftOutlined,
  BgColorsOutlined,
  BoldOutlined,
  CheckSquareFilled,
  CodeOutlined,
  createFromIconfontCN,
  DashOutlined,
  EyeOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  FullscreenOutlined,
  ItalicOutlined,
  LineHeightOutlined,
  LinkOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PictureOutlined,
  RedoOutlined,
  SmileOutlined,
  StrikethroughOutlined,
  TableOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  YoutubeOutlined
} from "@ant-design/icons";
import "./index.scss";
import RenderMarkdown from "./RenderMarkdown";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_2557198_m7pymcbur7.js"]
});

type IProps = {
  value: string;
  onChange: (value: string) => void;
};

type IState = {
  content: string;
  isPreview: boolean;
};
export default class Editor extends React.PureComponent<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      content: "",
      isPreview: false
    };
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>) {
    return nextProps.value !== this.state.content || nextState.content !== this.state.content;
  }

  onChange(value: string) {
    this.setState({ content: value });
    this.props.onChange(this.state.content);
  }

  onPreview() {
    this.setState({
      isPreview: !this.state.isPreview
    });
  }

  render() {
    return (
      <>
        <div className="editor-container">
          <div className="editor-toolbar">
            <Space>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item>
                      <span>正文</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-1" />}>
                      <span>标题1</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-2" />}>
                      <span>标题2</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-3" />}>
                      <span>标题3</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-4" />}>
                      <span>标题4</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-5" />}>
                      <span>标题5</span>
                    </Menu.Item>
                    <Menu.Item icon={<IconFont type="icon-h-6" />}>
                      <span>标题6</span>
                    </Menu.Item>
                  </Menu>
                }>
                <Tooltip title="标题">
                  <IconFont type="icon-heading" className="editor-toolbar-controls" />
                </Tooltip>
              </Dropdown>
              <Tooltip title="加粗">
                <BoldOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="字号">
                <FontSizeOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="字体">
                <IconFont type="icon-font" className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="斜体">
                <ItalicOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="下划线">
                <UnderlineOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="删除线">
                <StrikethroughOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="缩进">
                <MenuUnfoldOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item>
                      <span>默认</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>1</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>1.15</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>1.5</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>2</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>2.5</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>3</span>
                    </Menu.Item>
                  </Menu>
                }>
                <Tooltip title="行高">
                  <LineHeightOutlined className="editor-toolbar-controls" />
                </Tooltip>
              </Dropdown>
              <Tooltip title="文字颜色">
                <FontColorsOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="背景色">
                <BgColorsOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="链接">
                <LinkOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item icon={<OrderedListOutlined />}>
                      <span>有序列表</span>
                    </Menu.Item>
                    <Menu.Item icon={<UnorderedListOutlined />}>
                      <span>无序列表</span>
                    </Menu.Item>
                  </Menu>
                }>
                <Tooltip title="序列">
                  <UnorderedListOutlined className="editor-toolbar-controls" />
                </Tooltip>
              </Dropdown>
              <Tooltip title="代办事项">
                <CheckSquareFilled className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="对齐">
                <AlignLeftOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="引用">
                <IconFont type="icon-quote" className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="表情">
                <SmileOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="图片">
                <PictureOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="视频">
                <YoutubeOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="表格">
                <TableOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="代码块">
                <CodeOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="分割线">
                <DashOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="撤销">
                <UndoOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="恢复">
                <RedoOutlined className="editor-toolbar-controls" />
              </Tooltip>
              <Tooltip title="预览">
                <EyeOutlined className="editor-toolbar-controls" onClick={() => this.onPreview()} />
              </Tooltip>
              <Tooltip title="全屏">
                <FullscreenOutlined className="editor-toolbar-controls" />
              </Tooltip>
            </Space>
          </div>
          <Row>
            <Col
              span={12}
              className="editor-content"
              contentEditable={true}
              placeholder="请输入文章内容，支持 markdown 格式"
              onInput={e => this.onChange((e.target as HTMLDivElement).innerText)}
              onBlur={e => this.onChange((e.target as HTMLDivElement).innerText)}
            />
            <Col span={12} className="editor-preview">
              <RenderMarkdown content={this.state.content} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
