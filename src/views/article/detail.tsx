import { FC, useEffect, useState } from "react";
import { Card, message } from "antd";
import { useParams } from "react-router-dom";
import marked from "marked";
import hljs from "highlight.js";
import { getArticleById } from "../../apis/article";

type Params = {
  id: string;
};

const ArticleDetail: FC = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: any = await getArticleById({ id });
        if (response.resultCode === 0) {
          setContent(response.data.content);
        } else {
          message.error(`获取内容失败: ${response.errorMsg}`);
        }
      } catch (err) {
        message.error(`获取内容失败: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const renderer = new marked.Renderer();

    marked.setOptions({
      renderer,
      gfm: true, // 启动类似Github样式的Markdown,填写true或者false
      pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
      sanitize: false, // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
      //   tables: true, //支持Github形式的表格，必须打开gfm选项
      breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
      smartLists: true, // 优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
      smartypants: false,
      xhtml: false,
      langPrefix: "hljs ",
      highlight(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }, []);

  return (
    <Card loading={loading}>
      <p dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </Card>
  );
};

export default ArticleDetail;
