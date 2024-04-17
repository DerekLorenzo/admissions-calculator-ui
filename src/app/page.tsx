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
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    const multiselectRef = useRef<Multiselect>(null);

    if (typeof window !== "undefined") if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
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
        setSelectedColleges([]);
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
            setSubmitButtonClicked(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        setCalculatedRate(-1);
        setSubmitButtonClicked(true);
        getCalculatedRate().then(() => console.log("Retrieved Calculated Rate"));
    };

    const handleChangeMultiselect = (choices: string[]) => {
        setSelectedColleges(choices);
    };

    if (colleges.length === 0) {
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
                <div className="md:w-1/2 sm:w-3/4 text-center dark:text-gray-200 font-bold">
                    <h2>Combined Rate Calculator</h2>
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
            <div className="flex justify-center pt-4">
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
            </div>
            <div className="flex flex-col items-center pt-4">
                <button
                    className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
                    onClick={handleSubmit}
                >
                    Get Calculated Rate
                </button>
            </div>
            {submitButtonClicked && calculatedRate <= 0 ?
                <div role="status" className="flex justify-center pt-6">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : null
            }
            {calculatedRate > 0 ?
                <div className="flex justify-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                    <div
                        className="bg-white dark:bg-slate-600 dark:text-gray-200 shadow-xl border border-solid dark:border-black rounded-lg px-4 py-6 mx-4 my-4 md:w-1/3 sm:w-1/2">
                        <div className="text-nowrap">
                            <div>
                                <div className="align-top text-right">
                                    <button
                                        className="bg-sky-600 hover:bg-blue-700 text-white font-bold p-1 rounded-md"
                                        onClick={resetSelectedField}>Reset
                                    </button>
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
