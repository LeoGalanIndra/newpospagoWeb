export interface ServiceOrder {
  id: number;
  agreementId: number;
  billAccountId : number;
  serviceOrder: string;
  durationMonths: number;
  startDate: string;
  finVigencia: string | null;
  bagRedemption: number;
  bagValue?: number;
  discountValue?: number;
  discountReasonId?: number;
  sellerId: string;
  statusOrder: number;
}
