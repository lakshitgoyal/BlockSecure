
export type Transaction = {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'loan' | 'repayment';
  status: 'Completed' | 'Pending' | 'Flagged' | 'Failed';
  date: string;
};

export const transactions: Transaction[] = [
  { id: 'TXN789012', amount: 20000, type: 'loan', status: 'Completed', date: '2023-05-20' },
  { id: 'TXN456789', amount: 10000, type: 'repayment', status: 'Completed', date: '2023-05-18' },
  { id: 'TXN123456', amount: 50000, type: 'deposit', status: 'Completed', date: '2023-05-15' },
  { id: 'TXN098765', amount: 5000, type: 'withdrawal', status: 'Pending', date: '2023-05-21' },
  { id: 'TXN543210', amount: 100000, type: 'loan', status: 'Flagged', date: '2023-05-19' },
  { id: 'TXN654321', amount: 25000, type: 'repayment', status: 'Completed', date: '2023-05-17' },
];

export type Loan = {
  id: string;
  principal: number;
  interestRate: number;
  repaymentPeriod: number; // in days
  paid: number;
  status: 'Active' | 'Paid Off' | 'Defaulted';
};

export const myLoans: Loan[] = [
  { id: 'LOAN001', principal: 50000, interestRate: 12, repaymentPeriod: 30, paid: 25000, status: 'Active' },
  { id: 'LOAN002', principal: 100000, interestRate: 10, repaymentPeriod: 60, paid: 110000, status: 'Paid Off' },
  { id: 'LOAN003', principal: 20000, interestRate: 15, repaymentPeriod: 14, paid: 5000, status: 'Active' },
];

export const myBorrowings: Loan[] = [
    { id: 'BORROW001', principal: 30000, interestRate: 14, repaymentPeriod: 45, paid: 10000, status: 'Active' },
    { id'BORROW002', principal: 150000, interestRate: 11, repaymentPeriod: 90, paid: 40000, status: 'Active' },
];

export type LoanOffer = {
  id: string;
  amount: number;
  interestRate: number;
  repaymentPeriod: number; // in days
  borrowerTrustScore: number;
};

export const loanOffers: LoanOffer[] = [
  { id: 'OFFER001', amount: 10000, interestRate: 15, repaymentPeriod: 30, borrowerTrustScore: 75 },
  { id: 'OFFER002', amount: 50000, interestRate: 12.5, repaymentPeriod: 60, borrowerTrustScore: 88 },
  { id: 'OFFER003', amount: 25000, interestRate: 18, repaymentPeriod: 45, borrowerTrustScore: 62 },
];
