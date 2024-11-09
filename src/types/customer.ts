interface Customer {
  id: string;
  name: string;
  last_follow_up: Date;
  purchased_products: string[];
  interests: string[];
  created_at: Date;
}

export type { Customer };
