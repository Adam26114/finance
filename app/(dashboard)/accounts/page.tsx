"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Loader, Plus } from "lucide-react";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";
import { Skeleton } from "@/components/ui/skeleton";

const AccountsPage = () => {
    const newAccount = useNewAccount();
    const deleteAccount = useBulkDeleteAccounts();
    const accountsQuery = useGetAccounts();
    const accunts = accountsQuery.data || [];

    const isDisabled = accountsQuery.isLoading || deleteAccount.isPending;

    if (accountsQuery.isLoading) {
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

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className=" border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Account Page
                    </CardTitle>
                    <Button size="sm" onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={accunts}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteAccount.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountsPage;
