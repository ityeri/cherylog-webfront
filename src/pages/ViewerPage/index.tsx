import ViewerContainer from "@/components/ViewerContainer";
import {testChartData} from "@/testData.ts";
import getAll from "@/api/getAll.ts";
import {useEffect} from "react";

export default function ViewerPage() {
    // TODO
    // data converting and display test data conversion!!!!!!!!!!!!!!!!!!!!!!!!!!!!! it can make using optics?
    // how to live data display?
    // how to yun-dong with outside components?
    useEffect(() => {
        const test = async () => {
            console.log(await getAll())
        }

        test()
    }, [])

    return <div className="p-2 h-auto">
        <ViewerContainer chartData={testChartData}/>
    </div>
}