export type Transaction = {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'loan' | 'repayment';
  status: 'Completed' | 'Pending' | 'Flagged' | 'Failed';
  date: string;
};

export const transactions: Transaction[] = [
  { id: 'TXN789012', amount: 250, type: 'loan', status: 'Completed', date: '2023-05-20' },
  { id: 'TXN456789', amount: 150.75, type: 'repayment', status: 'Completed', date: '2023-05-18' },
  { id: 'TXN123456', amount: 500, type: 'deposit', status: 'Completed', date: '2023-05-15' },
  { id: 'TXN098765', amount: 75.20, type: 'withdrawal', status: 'Pending', date: '2023-05-21' },
  { id: 'TXN543210', amount: 1200, type: 'loan', status: 'Flagged', date: '2023-05-19' },
  { id: 'TXN654321', amount: 300, type: 'repayment', status: 'Completed', date: '2023-05-17' },
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
  { id: 'LOAN001', principal: 500, interestRate: 5, repaymentPeriod: 30, paid: 250, status: 'Active' },
  { id: 'LOAN002', principal: 1000, interestRate: 7, repaymentPeriod: 60, paid: 1070, status: 'Paid Off' },
  { id: 'LOAN003', principal: 200, interestRate: 10, repaymentPeriod: 14, paid: 50, status: 'Active' },
];

export const myBorrowings: Loan[] = [
    { id: 'BORROW001', principal: 300, interestRate: 6, repaymentPeriod: 45, paid: 100, status: 'Active' },
    { id: 'BORROW002', principal: 1500, interestRate: 8, repaymentPeriod: 90, paid: 400, status: 'Active' },
];

export type LoanOffer = {
  id: string;
  amount: number;
  interestRate: number;
  repaymentPeriod: number; // in days
  borrowerTrustScore: number;
};

export const loanOffers: LoanOffer[] = [
  { id: 'OFFER001', amount: 100, interestRate: 8, repaymentPeriod: 30, borrowerTrustScore: 75 },
  { id: 'OFFER002', amount: 500, interestRate: 6.5, repaymentPeriod: 60, borrowerTrustScore: 88 },
  { id: 'OFFER003', amount: 250, interestRate: 9, repaymentPeriod: 45, borrowerTrustScore: 62 },
];
