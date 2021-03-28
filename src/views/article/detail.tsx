import { FC, useEffect, useState } from "react";
import { Card, message } from "antd";
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
    <Card loading={loading}>
      <RenderMarkdown content={content} />
    </Card>
  );
};

export default ArticleDetail;
