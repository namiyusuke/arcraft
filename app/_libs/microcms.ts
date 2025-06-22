import { createClient } from "microcms-js-sdk";

import type { MicroCMSQueries, MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type Member = {
  name: string;
  image: MicroCMSImage;
  position: string;
  profile: string;
} & MicroCMSListContent;

// export type Life = {
//   title: string;
//   description: string;
//   content: string;
//   thumbnail?: MicroCMSImage;
// } & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

export type Life = {
  title: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

if (!process.env.MICRO_SERVICE_DOMAIN || !process.env.MICRO_API_KEY) {
  throw new Error("MICRO_SERVICE_DOMAIN and MICRO_API_KEY must be set");
}

const client = createClient({
  serviceDomain: process.env.MICRO_SERVICE_DOMAIN,
  apiKey: process.env.MICRO_API_KEY,
});

export const getLifeList = async (queries?: MicroCMSQueries) => {
  const listdata = await client.getList<Life>({ endpoint: "life", queries });
  return listdata;
};

export const getCategoryList = async (queries?: MicroCMSQueries) => {
  const listdata = await client.getList<Category>({ endpoint: "categories", queries });
  return listdata;
};

export const gettechlogList = async (queries?: MicroCMSQueries) => {
  const listdata = await client.getList<News>({ endpoint: "techlog", queries });
  return listdata;
};

export const gettechlogListByCategory = async (categoryIds: string[], queries?: MicroCMSQueries) => {
  if (categoryIds.length === 0) {
    return await gettechlogList(queries);
  }

  const filters = categoryIds.map((id) => `category[equals]${id}`).join("[or]");
  const listdata = await client.getList<News>({
    endpoint: "techlog",
    queries: {
      ...queries,
      filters,
    },
  });
  return listdata;
};

export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const content = await client.getListDetail<News>({ endpoint: "techlog", contentId, queries });
  return content;
};
export const getLifeDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const content = await client.getListDetail<Life>({ endpoint: "life", contentId, queries });
  return content;
};
export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
  return detailData;
};
