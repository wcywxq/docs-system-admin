import React from "react";
import { Row, Col } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import TocLink from "./TocLink";

type TProps = {
  content: string;
};

const RenderMarkdown: React.FC<TProps> = props => {
  const { content } = props;

  const tocLink = new TocLink();
  const renderer = new marked.Renderer();
  renderer.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string) => {
    const anchor = tocLink.add(text, level);
    return `<a id="${anchor}" href="#${anchor}"><h${level}>${text}</h${level}></a>\n`;
  };
  const options: marked.MarkedOptions = {
    renderer,
    gfm: true, // 启动类似 Github 样式的 Markdown,填写 true 或者 false
    pedantic: false, // 只解析符合 Markdown 定义的，不修正Markdown的错误。填写 true 或者 false
    sanitize: false, // 原始输出，忽略 HTML 标签，这个作为一个开发人员，一定要写 flase
    //   tables: true, //支持 Github 形式的表格，必须打开 gfm 选项
    breaks: false, // 支持 Github 换行符，必须打开 gfm 选项，填写 true 或者 false
    smartLists: true, // 优化列表输出，这个填写 ture 之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,
    xhtml: false,
    langPrefix: "hljs ",
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  };
  marked.setOptions(options);

  return (
    <Row gutter={[16, 0]}>
      <Col span={20}>
        <p className="markdown" dangerouslySetInnerHTML={{ __html: marked(content) }}></p>
      </Col>
      <Col span={4}>
        <div>{tocLink && tocLink.render()}</div>
      </Col>
    </Row>
  );
};

export default RenderMarkdown;
