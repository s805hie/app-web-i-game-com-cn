// assets/content-map.js
// 站点内容分区、关键词标签和搜索过滤函数

const contentSections = [
  {
    id: "game-news",
    title: "游戏资讯",
    tags: ["爱游戏", "新游发布", "版本更新"],
    items: [
      { title: "爱游戏平台夏季活动开启", url: "https://app-web-i-game.com.cn/news/summer", keywords: ["爱游戏", "夏季", "活动"] },
      { title: "热门手游《幻境传说》新版本上线", url: "https://app-web-i-game.com.cn/news/legend-update", keywords: ["幻境传说", "版本更新", "爱游戏"] },
      { title: "爱游戏用户突破千万", url: "https://app-web-i-game.com.cn/news/milestone", keywords: ["爱游戏", "用户", "里程碑"] }
    ]
  },
  {
    id: "game-guides",
    title: "攻略中心",
    tags: ["爱游戏", "攻略", "技巧"],
    items: [
      { title: "新手入门指南", url: "https://app-web-i-game.com.cn/guides/newbie", keywords: ["爱游戏", "新手", "入门"] },
      { title: "高难度副本通关攻略", url: "https://app-web-i-game.com.cn/guides/dungeon", keywords: ["副本", "爱游戏", "通关"] },
      { title: "装备强化技巧汇总", url: "https://app-web-i-game.com.cn/guides/equipment", keywords: ["装备", "强化", "爱游戏"] }
    ]
  },
  {
    id: "game-community",
    title: "社区互动",
    tags: ["爱游戏", "社区", "交流"],
    items: [
      { title: "玩家论坛热门讨论", url: "https://app-web-i-game.com.cn/community/forum", keywords: ["爱游戏", "论坛", "讨论"] },
      { title: "公会招募专区", url: "https://app-web-i-game.com.cn/community/guild", keywords: ["公会", "招募", "爱游戏"] },
      { title: "创意工坊作品展示", url: "https://app-web-i-game.com.cn/community/workshop", keywords: ["创意", "爱游戏", "展示"] }
    ]
  }
];

function searchContent(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();

  for (const section of contentSections) {
    for (const item of section.items) {
      const matchTitle = item.title.toLowerCase().includes(lowerKeyword);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(lowerKeyword));
      const matchTags = section.tags.some(t => t.toLowerCase().includes(lowerKeyword));

      if (matchTitle || matchKeywords || matchTags) {
        results.push({
          sectionTitle: section.title,
          sectionId: section.id,
          itemTitle: item.title,
          url: item.url,
          matchedTags: section.tags.filter(t => t.toLowerCase().includes(lowerKeyword))
        });
      }
    }
  }

  return results;
}

function getSectionById(sectionId) {
  return contentSections.find(section => section.id === sectionId) || null;
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function getItemsByTag(tag) {
  const results = [];
  const lowerTag = tag.toLowerCase();

  for (const section of contentSections) {
    const sectionTagMatch = section.tags.some(t => t.toLowerCase() === lowerTag);
    if (sectionTagMatch) {
      for (const item of section.items) {
        results.push({
          sectionTitle: section.title,
          itemTitle: item.title,
          url: item.url
        });
      }
    } else {
      for (const item of section.items) {
        if (item.keywords.some(k => k.toLowerCase() === lowerTag)) {
          results.push({
            sectionTitle: section.title,
            itemTitle: item.title,
            url: item.url
          });
        }
      }
    }
  }

  return results;
}

function generateSectionMap() {
  const map = {};
  for (const section of contentSections) {
    map[section.id] = {
      title: section.title,
      tags: section.tags,
      itemCount: section.items.length,
      items: section.items.map(item => ({
        title: item.title,
        url: item.url
      }))
    };
  }
  return map;
}

// 示例使用（可直接运行）
console.log("=== 所有标签 ===");
console.log(getAllTags());

console.log("\n=== 搜索 '爱游戏' ===");
const results = searchContent("爱游戏");
results.forEach(r => {
  console.log(`[${r.sectionTitle}] ${r.itemTitle} -> ${r.url}`);
});

console.log("\n=== 按标签 '攻略' 检索 ===");
const tagItems = getItemsByTag("攻略");
tagItems.forEach(r => {
  console.log(`[${r.sectionTitle}] ${r.itemTitle} -> ${r.url}`);
});

console.log("\n=== 站点内容地图 ===");
console.log(JSON.stringify(generateSectionMap(), null, 2));