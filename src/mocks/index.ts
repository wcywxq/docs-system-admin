import Mock from "mockjs";

const { Random } = Mock;

const ArticleList = {
  "data|100": [
    {
      "articleId|+1": 1,
      title: Random.ctitle(7, 9),
      author: Random.name(),
      "keywords|3-5": [Random.word(3, 5)],
      thumbUrl: Random.image("200x100", "#fb0a2a"),
      "tag|3-5": [Random.word(3, 5)],
      category: Random.word(3, 5),
      releaseStatus: Random.integer(0, 1),
      source: Random.integer(0, 1),
      createTime: Random.datetime(),
    },
  ],
}

Mock.mock('/api/article/list', 'get', ArticleList);