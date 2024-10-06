export type requestStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface DeclarationRequestType {
  id: string;
  name: string;
  requestDate: Date;
  status: requestStatus;
  url?: string;
}
