import HeaderBox from "@/components/HeaderBox";
import RigthSidebar from "@/components/RigthSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Hola"
            user={loggedIn?.name || "Guest"}
            subtext="Welcome to the Banking App"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
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
