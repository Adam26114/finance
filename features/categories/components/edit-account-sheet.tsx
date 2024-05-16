import { z } from "zod";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetCategory } from "@/features/categories/api/use-get-categorie";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useOpenCategory } from "@/features/categories/hooks/uee-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";


import { insertCategorySchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";



export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "Your are about to delete this category."
    );
    
    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;

    const formSheme = insertCategorySchema.pick({
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

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    const defaultValues = categoryQuery.data
        ? {
              name: categoryQuery.data.name,
          }
        : {
              name: "",
          };

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className=" space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>
                            Edit an existing category
                        </SheetDescription>
                        {isLoading ? (
                            <div className=" absolute inset-0 flex items-center justify-center">
                                <Loader className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        ) : (
                            <CategoryForm
                                id={id}
                                onSubmit={onSubmit}
                                disabled={isPending}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />
                        )}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};
