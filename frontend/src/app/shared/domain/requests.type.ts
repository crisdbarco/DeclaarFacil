export type requestStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface DeclarationRequestType {
  name: string;
  requestDate: Date;
  status: requestStatus;
  url?: string;
}
