export interface IResponse<T> {
       data: T[];
       per_page: number;
       current_page: number;
       total: number
}
