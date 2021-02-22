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
      "releaseStatus|0-1": Random.boolean() ? 1 : 0,
      "source|0-1": Random.boolean() ? 1 : 0,
      createTime: Random.datetime(),
    },
  ],
};

const UserList = {
  "data|20": [
    {
      "uid|+1": 1,
      userName: Random.first(),
      avatar: Random.image("200x100", "#fb0a2a"),
      email: Random.email(),
      phone: `13112345678`,
      description: Random.paragraph(),
      "isActive|0-1": Random.boolean() ? 1 : 0,
      createTime: Random.datetime(),
    },
  ],
};

Mock.mock("/api/article/list", "get", ArticleList);
Mock.mock("/api/user/list", "get", UserList);
