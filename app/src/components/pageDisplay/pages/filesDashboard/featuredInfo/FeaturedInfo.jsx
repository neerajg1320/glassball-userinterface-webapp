import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Accounts</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">8</span>
                    <span className="featuredMoneyRate">
                        -11.4
                        <ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Statements</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">102</span>
                    <span className="featuredMoneyRate">
                        -1.4
                        <ArrowDownward  className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Transactions</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">430</span>
                    <span className="featuredMoneyRate">
                        5.4
                        <ArrowUpward  className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
