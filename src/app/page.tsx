'use client';
import React, {useRef, useState} from "react";
import Multiselect from 'multiselect-react-dropdown';
import Header from "@/app/common/Header";
import Footer from "@/app/common/Footer";
import RateInfoDialog from "@/app/combined-rate-calculator/RateInfoDialog";
import {InformationCircleIcon} from "@heroicons/react/24/outline";

export default function Home() {
    const [colleges, setColleges] = useState<string[]>([]);
    const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
    const [calculatedRate, setCalculatedRate] = useState<number>(-1);
    //TODO: set dialog box to open only on first visit or until a do not show again checkbox is clicked
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

    const multiselectRef = useRef<Multiselect>(null);

    if (typeof window !== "undefined") if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("Detected mode: Dark")
        document.documentElement.classList.add('dark')
    } else {
        console.log("Detected mode: Light")
        document.documentElement.classList.remove('dark')
    }

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

    const resetSelectedField = () => {
        multiselectRef.current?.resetSelectedValues();
        setCalculatedRate(-1);
    }

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
    }

    if (colleges.length === 0){
        callAPI().then(() => console.log("Retrieved Colleges"));
    }

    return (
        <main className="flex-initial max-w-full min-h-screen flex-col justify-between p-2 dark:bg-slate-800">
            <div>
                <Header/>
            </div>
            <RateInfoDialog
                open={dialogBoxOpen}
                setOpen={setDialogBoxOpen}
            />
            <div className="flex justify-between pt-4">
                <div className="px-6"/>
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
                        ref={multiselectRef}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="mt-3 mr-1 rounded-md bg-sky-600 px-1 mx-3 shadow-sm hover:bg-sky-200 sm:mt-0"
                        onClick={() => setDialogBoxOpen(true)}
                    >
                        <InformationCircleIcon className="h-6 w-6 font-extrabold text-white"
                                   aria-hidden="true"/>
                    </button>
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
                        className="bg-white dark:bg-slate-600 dark:text-gray-200 shadow-xl border border-solid dark:border-black rounded-lg px-4 py-6 mx-4 my-4 md:w-1/3 sm:w-1/2">
                        <div className="text-nowrap">
                            <div>
                                <div className="align-top text-right">
                                    <button
                                        className="bg-sky-600 hover:bg-blue-700 text-white font-bold p-1 rounded-md"
                                        onClick={resetSelectedField}>Reset</button>
                                </div>
                                <div className="text-center">
                                    <span>
                                    Estimated Acceptance Rate:
                                    </span>
                                </div>
                            </div>
                            <div className="pt-2 text-center">
                                <span className="font-bold">
                                    {calculatedRate + "%"}
                                </span>
                            </div>
                        </div>
                        <div className="flex mx-auto bg-gray-200 dark:bg-slate-500 rounded-md text-balance text-center py-4 my-2">
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
