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
  category: {
    name: string;
    id: string;
  }[];
  date: string;
}

export interface PostSummaryModel {
  data: PostSummary[];
  meta: {
    totalCount: number;
  };
}
