export type InvoiceResponse = {
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_postal_code: string;
  user_id: string;
  invoice_date: string;
  invoice_number: string;
  id: string;
  created_at: string;
  subtotal: number;
  total: number;
  additional_discount_percentage: number | null;
  additional_discount_amount: number;
  eco_discount_percentage: number;
  eco_discount_amount: number;
};
