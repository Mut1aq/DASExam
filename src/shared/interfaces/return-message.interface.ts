export interface ReturnMessage {
  message: string;
  statusCode: number;
  token?: string | Promise<String>;
  fees?: number;
}
