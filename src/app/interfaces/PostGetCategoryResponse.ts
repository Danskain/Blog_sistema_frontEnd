export interface Data {
  id: number;
  title: string;
  content: string;
  userid: number;
  categoryid: number;
  created_at: string;
}

export interface PostGetCategoryResponse {
  status: number;
  message: string;
  data: Data[];
}