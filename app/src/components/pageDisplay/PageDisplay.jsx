import "./pageDisplay.css"

import {
    Switch,
    Route
} from 'react-router-dom';

import DocumentsDashboardPage from "./pages/documentsDashboard/DocumentsDashboardPage";
import FilesDashboardPage from "./pages/filesDashboard/FilesDashboardPage"
import FilesGridPage from "./pages/filesGrid/FilesGridPage";
import DocumentsGridPage from "./pages/documentsGrid/DocumentsGridPage";
import FileSingleDirectPage from "./pages/filesSingle/FileSingleDirectPage";

import TransactionGridPage from "./pages/portfolioTransactions/TransactionsGridPage";

import SettingsServer from "./pages/settingsServer/SettingsServer";
import PositionsGridPage from "./pages/portfolioPositions/PositionsGridPage";
import OpenPositionsGridPage from "./pages/portfolioOpenPositions/OpenPositionsGridPage";
import InvoicesGridPage from "./pages/financialInvoices/InvoicesGridPage";
import FinTransactionsGridPage from "./pages/financialTransactions/FinTransactionsGridPage"



  
function PageDisplay() {
    return ( 
        <div className="mainScreen">
            <Switch>
                <Route path="/documents/grid">
                    <DocumentsGridPage />
                </Route>
                <Route path="/files/grid">
                    <FilesGridPage />
                </Route>
                <Route exact path="/documents/dashboard">
                    <DocumentsDashboardPage />
                </Route>
                <Route exact path="/files/dashboard">
                    <FilesDashboardPage />
                </Route>
                <Route path="/files/:filename" component={FileSingleDirectPage}>
                    {/* <FilePreview /> */}
                </Route>

                <Route path="/portfolio/transactions">
                    <TransactionGridPage />
                </Route>
                <Route path="/portfolio/positions">
                    <PositionsGridPage />
                </Route>
                <Route path="/portfolio/openpositions">
                    <OpenPositionsGridPage />
                </Route>

                <Route path="/financial/invoices">
                    <InvoicesGridPage />
                </Route>
                <Route path="/financial/transactions">
                    <FinTransactionsGridPage />
                </Route>

                <Route path="/settings/server">
                    <SettingsServer />
                </Route>
            </Switch>
        </div>
    )
}

export default PageDisplay
