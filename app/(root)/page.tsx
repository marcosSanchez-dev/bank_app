import HeaderBox from "@/components/HeaderBox";
import RigthSidebar from "@/components/RigthSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
  const loggedIn = {
    firstName: "Marco",
    lastName: "Sánchez",
    email: "marcos.sanchez.dev@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Hola"
            user={loggedIn?.firstName || "Guest"}
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
        banks={[{ currentBalance: 123.05 }, { currentBalance: 321.01 }]}
      />
    </section>
  );
};

export default Home;
