import React, {useState} from 'react'
import Chart from './chart/Chart'
import FeaturedInfo from './featuredInfo/FeaturedInfo'

import { userData } from "../../../../dummyData";

import "./documentsDashboardPage.css";

import ResourceDisplay from '../../resourceDisplay/ResourceDisplay';
import PreviewDisplay from '../filesDashboard/filesPreview/PreviewDisplay';


function DocumentsDashboardPage({featured, chart}) {
    const [flagFeatured] = useState(featured ? true : false)
    const [flagChart] = useState(chart ? true : false)

    return (
        <div className="home">
            {flagFeatured && <FeaturedInfo />}
            {flagChart && <Chart  data={userData} title="User Analytics" dataKey="Active Users" grid  />}

            <div className="resourceWidgets">
                <div className="resourceListWidget">
                    <ResourceDisplay resName="documents"/>
                </div>
                <div className="resourcePreviewWidget">
                    <PreviewDisplay />                    
                </div>
            </div>
        </div>
    )
}

export default DocumentsDashboardPage
