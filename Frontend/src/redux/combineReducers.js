import authReducer from "./auth/authReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import currencyReducer from "./currencies/currencyReducer";
import walletReducer from "./wallet/walletReducer"
import userReducer from "./users/userReducer";
import roleReducer from "./roles/roleReducer";
import NetworkReducer from "./networks/networkReducer";
import externalWalletReducer from "./addresses/externalWalletReducer";
import AccountReducer from "./account/accountReducer";
import withdrawFeeReducer from "./withdrawFee/withdrawFeeReducer";
import InternalOrderReducer from "./internalOrder/internalOrderReducer";
import ExternalTransactionReducer from "./externalTransactions/externalTransactionReducer";
import transactionFeeReducer from "./transactionFee/transactionFeeReducer";
import LeverageOrderReducer from "./leverageOrder/leverageOrderReducer";
import marketReducer from "./market/marketReducer";

const middleware = [thunk]
const reducer = combineReducers({
  auth: authReducer,
  currency: currencyReducer,
  networks: NetworkReducer,
  wallet: walletReducer,
  user: userReducer,
  role: roleReducer,
  externalWallets: externalWalletReducer,
  accounts: AccountReducer,
  withdrawFee: withdrawFeeReducer,
  internalOrders: InternalOrderReducer,
  externalTransactions: ExternalTransactionReducer,
  transactionFee: transactionFeeReducer,
  LeverageOrders: LeverageOrderReducer,
  market: marketReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store