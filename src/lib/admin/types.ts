export interface AdminUser {
  id: string;
  email: string | null;
  is_anonymous: boolean;
  created_at: string;
  last_sign_in_at: string | null;
  subscription: AdminSubscription | null;
  total_transactions: number | null;
  last_sync: string | null;
  full_name: string | null;
}

export interface AdminSubscription {
  id: string;
  user_id: string;
  product_id: string;
  entitlement_ids: string[];
  original_transaction_id: string | null;
  status: "active" | "trial" | "expired" | "cancelled";
  period_type: "normal" | "trial";
  purchased_at: string;
  expires_at: string | null;
  billing_issue_detected_at: string | null;
  environment: "PRODUCTION" | "SANDBOX";
  last_event_id: string;
  created_at: string;
  updated_at: string;
  user_email?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type GiftDuration = "monthly" | "annual" | "lifetime";

export const PRODUCT_MAP: Record<GiftDuration, string> = {
  monthly: "co.smartspend.monthly",
  annual: "co.smartspend.annual",
  lifetime: "co.smartspend.lifetime",
};

export const DURATION_LABELS: Record<GiftDuration, string> = {
  monthly: "1 Mes",
  annual: "1 Año",
  lifetime: "Vitalicio",
};

export const STATUS_LABELS: Record<string, string> = {
  active: "Activa",
  trial: "Trial",
  expired: "Expirada",
  cancelled: "Cancelada",
};

export const PLAN_LABELS: Record<string, string> = {
  "co.smartspend.monthly": "Mensual",
  "co.smartspend.annual": "Anual",
  "co.smartspend.lifetime": "Vitalicio",
};
