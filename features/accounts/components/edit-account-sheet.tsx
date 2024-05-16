import { z } from "zod";

import { useOpenAccount } from "@/features/accounts/hooks/uee-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { insertAccountSchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Loader } from "lucide-react";

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);

    const isPending = editMutation.isPending;
    const isLoading = accountQuery.isLoading;

    const formSheme = insertAccountSchema.pick({
        name: true,
    });

    type FormValues = z.input<typeof formSheme>;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const defaultValues = accountQuery.data
        ? {
              name: accountQuery.data.name,
          }
        : {
              name: "",
          };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className=" space-y-4">
                <SheetHeader>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Edit an existing account
                    </SheetDescription>
                    {isLoading ? (
                        <div className=" absolute inset-0 flex items-center justify-center">
                            <Loader className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                        />
                    )}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
