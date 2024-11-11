interface Customer {
  id: string;
  name: string;
  last_follow_up: Date | null;
  purchased_products: string[];
  interests: string[];
  country_code: string;
  phone: string;
  birthday: Date | null;
  created_at: Date;
}

interface CustomerString {
  id: string;
  name: string;
  last_follow_up: string;
  purchased_products: string;
  interests: string;
  phone: string;
  country_code: string;
  birthday: string;
  created_at: string;
}

export type { Customer, CustomerString };
