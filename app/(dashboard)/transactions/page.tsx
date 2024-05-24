"use client";

import { useState } from "react";

import { transactions as transactionSchema } from "@/db/schema";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransctions } from "@/features/transactions/api/use-get-transctions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transctions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transctions";

import { Import, Loader, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
    LIST = "list",
    IMPORT = "import",
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
};

const TransactionsPage = () => {
    const [AccountDialog, confirm] = useSelectAccount();

    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);

    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    };

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    };

    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransctions();
    const transactions = transactionsQuery.data || [];

    const isDisabled =
        transactionsQuery.isLoading || deleteTransactions.isPending;

    const onSubmitImport = async (
        values: (typeof transactionSchema.$inferInsert)[]
    ) => {
        const accountId = await confirm();

        if (!accountId) {
            return toast.error("Please select an account to continue.");
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }));

        createTransactions.mutate(data, {
            onSuccess: () => {
                onCancelImport();
            },
        });
    };

    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className=" border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8  w-48" />
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <Skeleton className="h-8 w-[300px]" />
                        <Skeleton className="h-[300px] w-full flex items-center justify-center">
                            <Loader className="size-6 text-slate-300 animate-spin" />
                        </Skeleton>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog />
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                />
            </>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className=" border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transation History
                    </CardTitle>
                    <div className="flex lg:flex-row flex-col gap-y-2 items-center lg:gap-x-2">
                        <Button
                            size="sm"
                            onClick={newTransaction.onOpen}
                            className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2" />
                            Add New
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="payee"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;
