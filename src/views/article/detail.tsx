import { FC, useEffect, useState } from "react";
import { Card, message } from "antd";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../apis/article";

type Params = {
  id: string;
};

const ArticleDetail: FC = () => {
  const { id } = useParams<Params>();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getArticleById({ id });
        if (response.resultCode === 0) {
          setContent(response.data.content);
        } else {
          message.error(`获取内容失败: ${response.errorMsg}`);
        }
      } catch (err) {
        message.error(`获取内容失败: ${err}`);
      }
    };
    fetchData();
  }, [id]);

  return <Card>{content}</Card>;
};

export default ArticleDetail;
