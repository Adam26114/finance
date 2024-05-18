import { useOpenAccount } from "@/features/accounts/hooks/uee-open-account";

type Props = {
    account: string;
    accountId: string;
};

export const AccountColumn = ({ account, accountId }: Props) => {
    const { onOpen: onOpenAccount } = useOpenAccount();

    const onClick = () => {
        onOpenAccount(accountId);
    };

    return (
        <div
            className="flex items-center cursor-pointer hover:underline"
            onClick={onClick}
        >
            {account}
        </div>
    );
};
