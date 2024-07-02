export interface Sponsor {
       id: number;
       sponsor_code: string;
       sponsor_name: string;
       sponsor_type: string;
       sponsor_ID: string;
       address: string;
       postal_code: string;
       phone: string;
       email: string;
       max_limit: string;
       financial_limit: string;
       time_limit: number;
       active: number;
       created_by: number;
       updated_by: number;
       created_at: Date;
       updated_at: Date;
       created_by_name: string;
       updated_by_name: string;
       contact_officers: any[]
}
