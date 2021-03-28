import { FC, useEffect, useState } from "react";
import { Spin, Card, message } from "antd";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../apis/article";
import RenderMarkdown from "../../components/RenderMarkdown";

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

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Card bodyStyle={{ minHeight: "calc(100vh - 64px)" }}>
        <RenderMarkdown content={content} />
      </Card>
    </Spin>
  );
};

export default ArticleDetail;
