interface Customer {
  id: string;
  name: string;
  last_follow_up: Date | null;
  purchased_products: string[];
  country_code: string;
  phone: string;
  birthday: Date | null;
  description: string;
}

interface CustomerString {
  id: string;
  name: string;
  last_follow_up: string;
  purchased_products: string;
  country_code: string;
  phone: string;
  birthday: string;
  description: string;
}

export type { Customer, CustomerString };
