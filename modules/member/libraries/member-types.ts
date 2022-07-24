export interface Token {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
}

export interface UpdateUserCriteria {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  location?: string;
  bio?: string;
  instagram_username?: string;
}
