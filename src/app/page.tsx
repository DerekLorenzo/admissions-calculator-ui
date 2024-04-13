'use client';
import Multiselect from 'multiselect-react-dropdown';
import {useState} from "react";
import Header from "@/app/common/header";
import Footer from "@/app/common/footer";

export default function Home() {
    const [colleges, setColleges] = useState<string[]>([]);
    const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
    const [calculatedRate, setCalculatedRate] = useState<number>(-1);

    const callAPI = async () => {
        try {
            const res = await fetch(
              'https://us-central1-admissions-calculator.cloudfunctions.net/app/api/getNames');
            const data: string[] = await res.json();
            setColleges(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCalculatedRate = async () => {
        try {
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({colleges: selectedColleges})
            }
            const res = await fetch(
                'https://us-central1-admissions-calculator.cloudfunctions.net/app/api/getCalculatedRate',
                payload);
            const data: number = await res.json();
            setCalculatedRate(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeMultiselect = (choices: string[]) => {
        setSelectedColleges(choices);
        console.log(selectedColleges);
    }

    if (colleges.length === 0){
        callAPI().then(() => console.log("Retrieved Colleges"));
    } else {
        console.log(colleges);
    }

    return (
        <main className="flex-initial max-w-full min-h-screen flex-col justify-between p-6">
            <div>
                <Header/>
            </div>
            <div className="flex justify-center">
                <div className="md:w-1/2 sm:w-3/4">
                    <Multiselect
                        style={{chips: {background: "rgb(2 132 199)"}}}
                        className="multiselect"
                        isObject={false}
                        options={colleges}
                        onKeyPressFn={function noRefCheck() {
                        }}
                        onRemove={handleChangeMultiselect}
                        onSelect={handleChangeMultiselect}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center pt-4">
                <button
                    className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
                    onClick={getCalculatedRate}
                >
                    Get Calculated Rate
                </button>
            </div>
            {calculatedRate > 0 ?
                <div className="flex justify-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                    <div
                        className="bg-white shadow-xl border border-solid rounded-lg px-4 py-6 mx-4 my-4 md:w-1/3 sm:w-1/2">
                        <div className="text-nowrap justify-center text-center">
                            <div>
                            <span>
                                Estimated Acceptance Rate:
                            </span>
                            </div>
                            <div className="pt-2">
                            <span className="font-bold">
                                {calculatedRate + "%"}
                            </span>
                            </div>
                        </div>
                        <div className="flex mx-auto bg-gray-200 rounded-md text-balance text-center py-4 my-2">
                            Note: This calculation is not a guarantee of admission but rather an estimation of the
                            likelihood of acceptance for a typical candidate based on historical acceptance rates.
                        </div>
                    </div>
                </div> : null}
            <div className="flex justify-center">
                <Footer/>
            </div>
        </main>
    );
}
