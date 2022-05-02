import "./dashboardSidebar.css"
import { TrendingUp, AttachFile, GridOn, Equalizer } from '@mui/icons-material';
import {Link} from 'react-router-dom';


export default function DashboardSidebar() {
    return (
        <div className="dashboardSidebar">
            <div className="others">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Import</h3>
                        <ul className="sidebarList">
                            <Link to="/files/grid">    
                                <li className="sidebarListItem">
                                    <GridOn className="sidebarIcon"/>
                                    Document Files
                                </li>
                            </Link>
                            {/* <Link to="/files/child.jpeg">    
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    File Preview
                                </li>
                            </Link> */}
                        </ul>
                    </div>

                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Documents</h3>
                        <ul className="sidebarList">
                            <Link to="/files/dashboard">
                                <li className="sidebarListItem">
                                    <AttachFile className="sidebarIcon"/>
                                    Contract Notes
                                </li>
                            </Link>
                            <Link to="/files/dashboard">
                                <li className="sidebarListItem">
                                    <AttachFile className="sidebarIcon"/>
                                    Financial Ledger
                                </li>
                            </Link>
                        </ul>
                    </div>

                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Portfolio</h3>
                        <ul className="sidebarList">    
                            <Link to="/portfolio/transactions">
                                <li className="sidebarListItem">
                                    <Equalizer className="sidebarIcon"/>
                                    Transactions
                                </li>
                            </Link>                    
                            <Link to="/portfolio/positions">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Profit & Loss
                                </li>
                            </Link>
                            <Link to="/portfolio/openpositions">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Portfolio
                                </li>
                            </Link>
                        </ul>
                    </div>

                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Contract Notes</h3>
                        <ul className="sidebarList">
                            <Link to="/financial/invoices">
                                <li className="sidebarListItem">
                                    <Equalizer className="sidebarIcon"/>
                                    List
                                </li>
                            </Link>
                            <Link to="/financial/invoices">
                                <li className="sidebarListItem">
                                    <Equalizer className="sidebarIcon"/>
                                    Trade Transactions
                                </li>
                            </Link>
                            <Link to="/financial/invoices">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Brokerage
                                </li>
                            </Link>
                            <Link to="/financial/invoices">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Expenses
                                </li>
                            </Link>
                        </ul>
                    </div>

                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Financial Ledger</h3>
                        <ul className="sidebarList">
                            <Link to="/financial/transactions">
                                <li className="sidebarListItem">
                                    <Equalizer className="sidebarIcon"/>
                                    CN Transfers
                                </li>
                            </Link>
                            <Link to="/financial/transactions">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Expenses
                                </li>
                            </Link>
                            <Link to="/financial/transactions">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Bank Transfers
                                </li>
                            </Link>
                            <Link to="/financial/transactions">
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    Margin Transfers
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
