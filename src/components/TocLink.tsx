import { Anchor } from "antd";

const { Link } = Anchor;

export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

export default class TocLink {
  anchors: string[];

  tocItems: TocItems = [];

  constructor() {
    this.anchors = [];
    this.tocItems = [];
  }

  add(text: string, level: number, id: string = "") {
    const count = this.anchors.filter(anchor => anchor === text).length;
    const anchor = id || (count ? `${text}${count}` : text);
    this.anchors.push(anchor);
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (items.length === 0) {
      // 第一个 item 直接 push
      items.push(item);
    } else {
      let lastItem = items.slice(-1)[0]; // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = children.slice(-1)[0]; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else {
        // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.anchors = [];
  };

  renderToc(items: TocItem[]) {
    // 递归 render
    return items.map(item => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  // 滚动效果，组织默认路由切换（对于长列表的toc需额外配置，暂时用css处理）
  handleClick(
    e: React.MouseEvent<HTMLElement>,
    link: {
      title: React.ReactNode;
      href: string;
    }
  ) {
    e.preventDefault();
    console.log(link);
    if (link.href) {
      // 找到锚点对应得的节点，href 对应的值默认都包含 # 哈希，因此取其后面的
      let element = document.getElementById(link.href.slice(1));
      // 若是对应id的锚点存在，就跳滚动到锚点顶部
      element && element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  render() {
    return (
      <Anchor offsetTop={1} affix showInkInFixed onClick={this.handleClick} getContainer={() => document.querySelector(".markdown") as any}>
        {this.renderToc(this.tocItems)}
      </Anchor>
    );
  }
}
