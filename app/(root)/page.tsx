import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RigthSidebar from "@/components/RigthSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Hola"
            user={`${loggedIn?.firstName} ${loggedIn?.lastName}` || "Guest"}
            subtext="Welcome to the Banking App"
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        recent
      </div>
      <RigthSidebar
        user={loggedIn}
        transactions={[]}
        banks={[
          {
            $id: "",
            accountId: "",
            bankId: "",
            accessToken: "",
            fundingSourceUrl: "",
            userId: "",
            shareableId: "",
            id: "",
            availableBalance: 0,
            currentBalance: 123.05,
            officialName: "",
            mask: "",
            institutionId: "",
            name: "",
            type: "",
            subtype: "",
            appwriteItemId: "",
          },
          {
            $id: "",
            accountId: "",
            bankId: "",
            accessToken: "",
            fundingSourceUrl: "",
            userId: "",
            shareableId: "",
            id: "",
            availableBalance: 0,
            currentBalance: 321.01,
            officialName: "",
            mask: "",
            institutionId: "",
            name: "",
            type: "",
            subtype: "",
            appwriteItemId: "",
          },
        ]}
      />
    </section>
  );
};

export default Home;
