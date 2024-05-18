import { z } from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader } from "lucide-react";

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    const createMutation = useCreateTransaction();

    const formSheme = insertTransactionSchema.omit({
        id: true,
    });

    /**
     * Categories
     * */

    const categoryQuery = useGetCategories();
    const categoryMutaion = useCreateCategory();
    const onCreateCategory = (name: string) =>
        categoryMutaion.mutate({
            name,
        });

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
    }));

    /**
     * Account
     * */
    const accountQuery = useGetAccounts();
    const accountMutaion = useCreateAccount();
    const onCreateAccount = (name: string) =>
        accountMutaion.mutate({
            name,
        });

    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const isPending =
        createMutation.isPending ||
        categoryMutaion.isPending ||
        accountMutaion.isPending;

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

    type FormValues = z.input<typeof formSheme>;

    const onSubmit = (values: FormValues) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className=" space-y-4">
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>Add a new transaction</SheetDescription>

                    {isLoading ? (
                        <div className=" absolute inset-0 flex items-center justify-center ">
                            <Loader className=" text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <TransactionForm
                            onSubmit={onSubmit}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                        />
                    )}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
