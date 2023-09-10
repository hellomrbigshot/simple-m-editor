
export interface configChildrenItem {
  text: string,
  size: number | string,
  title: string,
  content: string
}
export interface configItem {
  icon: string,
  title: string,
  showIcon: boolean,
  content?: string,
  children?: configChildrenItem[]
}
export const config: configItem[] = [
  {
    icon: 'icon-zitibiaoti',
    title: '标题',
    showIcon: true,
    children: [
      {
        text: 'H1',
        size: 32,
        title: '一级标题',
        content: '\n# h1'
      },
      {
        text: 'H2',
        size: 24,
        title: '二级标题',
        content: '\n## h2'
      },
      {
        text: 'H3',
        size: 18,
        title: '三级标题',
        content: '\n### h3'
      },
      {
        text: 'H4',
        size: 16,
        title: '四级标题',
        content: '\n#### h4'
      }
    ]
  },
  {
    icon: 'icon-zitijiacu',
    title: '加粗',
    content: '**加粗** ',
    showIcon: true
  },
  {
    icon: 'icon-zitixieti',
    title: '斜体',
    content: '*斜体* ',
    showIcon: true
  },
  {
    icon: 'icon-zitishanchuxian',
    title: '删除线',
    content: '~~删除线~~ ',
    showIcon: true
  },
  {
    icon: 'icon-zitixiahuaxian',
    title: '下划线',
    content: '<u>下划线</u>',
    showIcon: true
  },
  {
    icon: 'icon-charulianjie',
    title: '链接',
    content: '[世说新语](https://react.hellomrbigbigshot.xyz)',
    showIcon: true
  },
  {
    icon: 'icon-yinyong',
    title: '引用',
    content: '\n> 这是一段引用文字',
    showIcon: true
  },
  {
    icon: 'icon-zitidaima',
    title: '代码块',
    content: '\n```\n console.log(\'hello world\');\n```\n',
    showIcon: true
  },
  {
    icon: 'icon-charutupian',
    title: '图片',
    content: '![这是一张图片](https://hellomrbigbigshot.xyz/api/file/avatar?filename=1534775389648.png)',
    showIcon: true
  },
  {
    icon: 'icon-youxupailie',
    title: '有序列表',
    content: '\n1. 列表1 \n2. 列表2 \n3. 列表3',
    showIcon: true
  },
  {
    icon: 'icon-wuxupailie',
    title: '无序列表',
    content: '\n\n- 列表1 \n- 列表2 \n- 列表3',
    showIcon: true
  },
  {
    icon: 'icon-fengexian',
    title: '分割线',
    content: '\n***\n',
    showIcon: true
  },
  {
    icon: 'icon-biaodanzujian-biaoge',
    title: '表格',
    content: '\n标题1 | 标题2 \n---  |---\n第一行第一列 | 第一行第二列\n第二行第一列 | 第二行第二列\n',
    showIcon: true
  },
  {
    icon: 'icon-zuoduiqi',
    title: '左对齐',
    content: '\n<p align="left">左对齐</p>\n',
    showIcon: true
  },
  {
    icon: 'icon-juzhongduiqi',
    title: '居中对齐',
    content: '\n<center>居中对齐</center>\n',
    showIcon: true
  },
  {
    icon: 'icon-youduiqi',
    title: '右对齐',
    content: '\n<p align="right">右对齐</p>\n',
    showIcon: true
  }
]
