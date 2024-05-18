import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ImportTable } from "./import-table";

const datFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "data", "payee"];

interface SelectedColumnsState {
    [key: string]: string | null;
}

type Props = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
    const [SelectedColumns, setSelectedColumns] =
        useState<SelectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className=" border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transation
                    </CardTitle>
                    <Button size="sm" onClick={onCancel}>
                        Cancle
                    </Button>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={SelectedColumns}
                        omTableHeaderSelectChange={() => {}}
                    />
                </CardContent>
            </Card>
        </div>
    );
};