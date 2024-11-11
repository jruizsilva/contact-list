interface Customer {
  id: string;
  name: string;
  last_follow_up: Date | null;
  purchased_products: string[];
  interests: string[];
  phone: string;
  country_code: string;
  birthday: Date | null;
  created_at: Date;
}

export type { Customer };
