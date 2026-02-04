import ViewerContainer from "@/components/ViewerContainer";
import {testChartData} from "@/testData.ts";

export default function ViewerPage() {
    return <div className="p-2 bg-background-primary w-full h-auto">
        <ViewerContainer chartData={testChartData}/>
    </div>
}