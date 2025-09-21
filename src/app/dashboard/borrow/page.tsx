
import { CreateLoanOffer } from '@/components/dashboard/create-loan-offer';
import { LoansCard } from '@/components/dashboard/loans-card';

export default function BorrowPage() {
    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
                <LoansCard hideViewAll />
            </div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                <CreateLoanOffer />
            </div>
        </div>
    );
}
