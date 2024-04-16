interface PostSummary {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  summary: string;
  author: {
    firstName: string;
    lastName: string;
  };
  category: PostCategoryModel[];
  date: string;
}

export interface PostSummaryModel {
  data: PostSummary[];
  meta: {
    totalCount: number;
    nextPage: string;
  };
}

export interface PostModel {
  id: string;
  title: string;
  author: {
    firstName: string;
    lastName: string;
    image: string;
  };
  body: string;
}

export interface PostCategoryModel {
  name: string;
  id: string;
}
