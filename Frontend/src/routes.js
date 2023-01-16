// layouts
import PublicLayout from "./components/layouts/PublicLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";

// Public Components
import LandingPage from "./components/LandingPage/LandingPage";
import MarketPage from "./components/Market/MarketInfo";
import TradePage from "./components/Trade/TradePage";
import EarnPage from "./components/Earn/EarnPage";

// Auth Components
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import Referred from "./components/Referral/Referred";

// Private Components
import OverviewPage from "./components/Overview/OverviewPage";
import WithdrawCryptoPage from "./components/WithdrawCrypto/WithdrawCryptoPage";
import ManageAddressPage from "./components/ManageAddress/ManageAddressPage";
import TransectionHistoryPage from "./components/TransectionHistory/TransectionHistoryPage";
import DepositPage from "./components/Deposit/DepositPage";
import Convert from "./components/Convert/Convert";
import AccountStatement from "./components/AccountStatement/AccountStatement";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Setting from "./components/Setting/Setting";
import ConvertHistoryPage from "./components/ConvertHistory/ConvertHistoryPage";

const routes = [
  { path: "/", exact: true, name: "Home", layout: PublicLayout, component: LandingPage },
  { path: "/market", exact: true, name: "Market", layout: PublicLayout, component: MarketPage },
  { path: "/trade/:coins", exact: true, name: "Trade", layout: PublicLayout, component: TradePage },
  { path: "/futures", exact: true, name: "Futures", layout: PublicLayout, component: EarnPage },

  { path: "/register", exact: true, name: "Register", layout: AuthLayout, component: RegisterPage },
  { path: "/login", exact: true, name: "Login", layout: AuthLayout, component: LoginPage },
  // { path: "/referred/:code", exact: true, name: "Referred", layout: AuthLayout, component: Referred },

  { path: "/overview", exact: true, name: "Overview", layout: PrivateLayout, component: OverviewPage },
  { path: "/manage-address", exact: true, name: "Manage addresses", layout: PrivateLayout, component: ManageAddressPage },
  { path: "/withdraw-crypto", exact: true, name: "Withdraw", layout: PrivateLayout, component: WithdrawCryptoPage },
  { path: "/transaction-history", exact: true, name: "Transaction History", layout: PrivateLayout, component: TransectionHistoryPage },
  { path: "/deposit", exact: true, name: "Deposit", layout: PrivateLayout, component: DepositPage },
  { path: "/convert", exact: true, name: "Convert", layout: PrivateLayout, component: Convert },
  { path: "/account-statement", exact: true, name: "Account Statement", layout: PrivateLayout, component: AccountStatement },
  { path: "/forgot-password", exact: true, name: "Forgot Password", layout: PrivateLayout, component: ForgotPassword },
  { path: "/change-password", exact: true, name: "Change Password", layout: PrivateLayout, component: ChangePassword },
  { path: "/profile-setting", exact: true, name: "Settings", layout: PrivateLayout, component: Setting },
  { path: "/convert-history", exact: true, name: "Transactions", layout: PrivateLayout, component: TransectionHistoryPage },
];

export default routes;


// ================
// EXTRA OLD ROUTES
// ================

{/* <Route path="trade/:coins" element={<TradePage />} /> */ }
{/* <Route path="futures" element={<EarnPage />} /> */ }
{/* <Route path="market" element={<MarketPage />} /> */ }

{/* <Route path="identity-verification" element={<IdentityVerificationPage />} /> */ }
{/* <Route path="identity-verification2" element={<IdentityVerificationPage2 />} /> */ }
{/* <Route path="deposit-fiat" element={<DepositFiatPage />} /> */ }
{/* <Route path="deposit-fiat2" element={<DepositFiat2Page />} /> */ }
{/* <Route path="additional-info" element={<AdditionalInformationPage />} /> */ }
{/* <Route path="account-created" element={<AccountCreatedPage />} /> */ }
{/* <Route path="convert-history" element={<ConvertHistoryPage />} /> */ }
{/* <Route path="forgot-password2" element={<ForgotPassword2 />} /> */ }
{/* <Route path="dashboard" element={<Dashboard />} /> */ }

{/* <Route path="receive-amount" element={<ReceiveAmountPage />} /> */ }
{/* <Route path="personal-info" element={<PersonalPage />} /> */ }