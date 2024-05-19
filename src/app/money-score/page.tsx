'use client';
import React, {useEffect, Fragment, useState} from "react";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Combobox, Listbox, Transition, Tab } from '@headlessui/react'
import RateInfoDialog from "@/components/rate-info-dialog";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import ScoreBarChart from "@/app/money-score/score-bar-chart";

export default function MoneyScore() {
    const [scores, setScores] = useState<{ [key: string]: any }>({})
    const [colleges, setColleges] = useState<string[]>([]);
    const [collegesWithMajors, setCollegesWithMajors] = useState<{ [key: string]: any }>({});
    const [majors, setMajors] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [selectedCollege, setSelectedCollege] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("Choose One");
    const [selectedFirstGen, setSelectedFirstGen] = useState("Choose One");
    const [selectedGender, setSelectedGender] = useState("Choose One");
    const [moneyScore, setMoneyScore] = useState<{ [key: string]: string }>({});
    const [infoDialogBoxOpen, setInfoDialogBoxOpen] = useState(false);
    const [firstGenDialogBoxOpen, setFirstGenDialogBoxOpen] = useState(false);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [cookies, setCookies] = useState<{ [key: string]: string }>({});
    const [cookiesChecked, setCookiesChecked] = useState(false);
    const [called, setCalled] = useState(false);
    const { control, handleSubmit} = useForm({
        defaultValues: {
            school: "",
            major: "",
            gender: "",
            income: "",
            firstGen: ""
        }
    });
    const infoDialogContents: { [key: string]: any } = {
        title: "MoneyScore",
        body: [
            "Placeholder"
        ]
    };
    const firstGenDialogContents: { [key: string]: any } = {
        title: "First Generation Student",
        body: [
            "Placeholder"
            ]
    };

    const filteredColleges: string[] = query === ''
            ? colleges
            : colleges.filter((college) => {
                return college.toLowerCase().includes(query.toLowerCase())
            });

    const genders: string[] = [
        "Female",
        "Male",
        "Not listed",
        "Prefer not to say"
    ];

    const firstGen: string[] = [
        "Yes",
        "No",
        "Not Sure"
    ];

    const buildScoreDetails = (scoreParams: { [key: string]: string }) => {
        let message: string = "Score based on a student";

        if (scoreParams["school"]) {
            message = message + " attending " + scoreParams["school"];
        }

        if (scoreParams["major"]) {
            message = message + " majoring in " + scoreParams["major"];
        }

        if (scoreParams["income"]) {
            message = message + " with a " + (scoreParams["income"] === "Mid" ? "medium"
                : scoreParams["income"].toLowerCase()) + " family income";
        }

        if (scoreParams["gender"]|| scoreParams["firstGen"]) {
            const identifiers: (string | null)[] = [scoreParams["gender"] ? scoreParams["gender"].toLowerCase() : null,
                scoreParams["firstGen"] ? scoreParams["firstGen"] === "Yes" ? "first-generation"
                    : "not first-generation" : null].filter(n => n);

            if (identifiers.length == 2) {
                message = message + " that identifies as " + identifiers[0] + " and " + identifiers[1];
            } else if (identifiers.length == 1) {
                message = message + " that identifies as " + identifiers[0];
            }
        }

        message = message + "."

        return message;
    };

    const callAPI = async () => {
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + '/app/api/v2/getNamesWithMajors');
            const data: { [key: string]: any } = await res.json();
            setCollegesWithMajors(data);
            let collegeList: string[] = [];
            Object.keys(data).forEach((college: string) => collegeList.push(college));
            setColleges(collegeList.sort());
        } catch (error) {
            console.log(error);
        }
    };

    const getCookies = () => {
        const cookieSet: { [key: string]: string } = {};
        document.cookie.split(';').forEach((cookie) => {
            const [name, val] = cookie.split('=').map(c => c.trim());
            cookieSet[name] = val;
        })
        setCookies(cookieSet);
    };

    const convertIncome = (income: string) => {
        const incomeAsFloat = parseFloat(income);

        if (incomeAsFloat > 75000.0) return "High"
        else if (incomeAsFloat > 30000.0 && incomeAsFloat <= 75000) return "Mid"
        else if (incomeAsFloat <= 30000.0) return "Low"
        else return ""
    };

    const getMoneyScore = async (input: { [key: string]: string }) => {
        try {
            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            }
            const res = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + '/app/api/v2/getMoneyScore',
                payload);
            const data: { [key: string]: any } = await res.json();
            setMoneyScore(data);
            setScores({
                IncomeScore: {
                    name: "IncomeScore",
                    score: Math.round(parseFloat(data["incomeScore"])*100)/100,
                    scale: ["High Income", "Low Income"],
                    message: buildScoreDetails(data["incomeParams"])
                },
                NetScore: {
                    name: "NetScore",
                    score: Math.round(parseFloat(data["netScore"])*100)/100,
                    scale: null,
                    message: "The NetScore is determined by combining the results of the IncomeScore and " +
                        "DebtScore"
                },
                DebtScore: {
                    name: "DebtScore",
                    score: Math.round(parseFloat(data["debtScore"])*100)/100,
                    scale: ["Low Debt", "High Debt"],
                    message: buildScoreDetails(data["debtParams"])
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const linkFormatter = (linkString: string) => {
        const matches = linkString.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/=]*)/g
        );

        return matches?.map(match => match.startsWith("http") ? match : ("https://" + match));
    };

    const onSubmit: SubmitHandler<any> = (data) => {
        if (data.income != "") {
            data.income = convertIncome(data.income);
        }
        setSubmitButtonClicked(true);
        getMoneyScore(data).then(() => console.log("Retrieved MoneyScore"));
    };

    if (colleges.length < 5 && !called) {
        setCalled(true);
        callAPI().then(() => console.log("Retrieved College List"));
    }

    useEffect(() => {
        if (!cookiesChecked) {
            getCookies();
            setCookiesChecked(true);
        } else {
            if (!Object.keys(cookies).includes("visitedMoneyScore") || cookies["visitedMoneyScore"] != "true") {
                document.cookie = "visitedMoneyScore=true";
                setInfoDialogBoxOpen(true);
            }
        }
    }, [setCookiesChecked, setInfoDialogBoxOpen, cookiesChecked, cookies])

    useEffect(() => {
        if (selectedCollege && Object.keys(collegesWithMajors).includes(selectedCollege)) {
            let majorsList = collegesWithMajors[selectedCollege].majors
                ? collegesWithMajors[selectedCollege].majors
                : [];
            majorsList = majorsList.sort();
            majorsList?.push("Undecided or Not Listed");
            majorsList = [...new Set(majorsList)]
            setMajors(majorsList);
        }
    }, [selectedCollege, collegesWithMajors])

    return (
        <div>
            <RateInfoDialog
                open={infoDialogBoxOpen}
                setOpen={setInfoDialogBoxOpen}
                title={infoDialogContents.title}
                content={infoDialogContents.body}
            />
            <RateInfoDialog
                open={firstGenDialogBoxOpen}
                setOpen={setFirstGenDialogBoxOpen}
                title={firstGenDialogContents.title}
                content={firstGenDialogContents.body}
            />
            <div className="flex justify-between pt-4">
                <div className="px-6"/>
                <div className="md:w-1/2 sm:w-3/4 text-center dark:text-gray-200 font-bold text-xl">
                    <h2>MoneyScore</h2>
                </div>
                <div>
                    <button
                        type="button"
                        className="mt-3 mr-1 rounded-md bg-sky-600 px-1 mx-3 shadow-sm hover:bg-sky-300 sm:mt-0"
                        onClick={() => setInfoDialogBoxOpen(true)}
                    >
                        <InformationCircleIcon className="h-6 w-6 font-extrabold text-white"
                                               aria-hidden="true"/>
                    </button>
                </div>
            </div>
            {!submitButtonClicked && Object.keys(moneyScore).length == 0 ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center pt-4">
                        <div
                            className="w-full lg:w-3/4 justify-center bg-gray-100 dark:bg-slate-700 dark:text-gray-200
                        shadow-xl border border-solid dark:border-black rounded-lg px-4 py-6 mx-4 my-4"
                        >
                            <div className="flex flex-wrap text-left justify-between">
                                <div className="flex-col px-2 lg:px-0 lg:pr-3 w-full lg:w-1/2">
                                    <h2 className="pl-2">
                                        School
                                    </h2>
                                    <Controller
                                        name="school"
                                        rules={{required: true}}
                                        control={control}
                                        render={({field: {onChange}}) => (
                                            <Combobox value={selectedCollege} onChange={(event) => {
                                                setSelectedCollege(event);
                                                onChange(event);
                                            }}>
                                                <div className="relative flex w-full mt-1">
                                                    <div className="relative w-full cursor-default overflow-hidden
                                                    rounded-lg bg-white text-left shadow-md focus:outline-none
                                                    focus-visible:ring-2 focus-visible:ring-white/75
                                                    focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300
                                                    sm:text-sm"
                                                    >
                                                        <Combobox.Input
                                                            className="flex w-full border-none py-2 pl-3 pr-10 text-sm
                                                            leading-5 text-gray-900 focus:ring-0"
                                                            placeholder="Type Here"
                                                            onChange={(event) =>
                                                                setQuery(event.target.value)}
                                                        />
                                                        <Combobox.Button
                                                            className="absolute inset-y-0 right-0 flex items-center
                                                            pr-2"
                                                        >
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </Combobox.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                        afterLeave={() => setQuery('')}
                                                    >
                                                        <Combobox.Options
                                                            className="absolute mt-10 max-h-60 w-full overflow-auto
                                                            rounded-md bg-white py-1 text-base shadow-lg ring-1
                                                            ring-black/5 focus:outline-none sm:text-sm"
                                                            style={{zIndex: 1}}>
                                                            {filteredColleges.length === 0 && query !== '' ? (
                                                                <div
                                                                    className="relative cursor-default select-none px-4
                                                                    py-2 text-gray-700"
                                                                >
                                                                    Nothing found.
                                                                </div>
                                                            ) : (
                                                                filteredColleges
                                                                    .filter((_college, index) => index < 250)
                                                                    .map((college) => (
                                                                    <Combobox.Option
                                                                        key={college}
                                                                        className={({active}) =>
                                                                            `relative cursor-default select-none py-2 
                                                                            pl-10 pr-4 ${ active ? 'bg-teal-600 ' +
                                                                                'text-white' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={college}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${
                                                                                        selected ? 'font-medium' 
                                                                                            : 'font-normal'
                                                                                    }`}
                                                                                >
                                                                                    {college}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className={`absolute inset-y-0 
                                                                                        left-0 flex items-center pl-3 ${
                                                                                            active ? 'text-white' 
                                                                                                : 'text-teal-600'
                                                                                        }`}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5"
                                                                                                   aria-hidden="true"
                                                                                        />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )}
                                                        </Combobox.Options>
                                                    </Transition>
                                                </div>
                                            </Combobox>
                                        )}
                                    />
                                </div>
                                <div className="flex-col pt-2 lg:pt-0 px-2 lg:px-0 lg:pl-3 w-full lg:w-1/2">
                                    <h2 className="pl-2">
                                        Major
                                    </h2>
                                    <Controller
                                        name="major"
                                        rules={{required: true}}
                                        control={control}
                                        render={({field: {onChange}}) => (
                                            <Listbox disabled={majors?.length === 0} value={selectedMajor}
                                                     onChange={(event) => {
                                                         setSelectedMajor(event);
                                                         onChange(event);
                                                     }}>
                                                <div className="relative flex w-full mt-1">
                                                    <Listbox.Button
                                                        className="flex relative w-full py-2 pl-3 pr-10 text-sm
                                                        leading-5 text-gray-900 focus:ring-0cursor-default rounded-lg
                                                        bg-white text-left shadow-md focus:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-white/75
                                                        focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300
                                                        sm:text-sm"
                                                    >
                                                        <span className="block truncate">{selectedMajor}</span>
                                                        <span
                                                            className="pointer-events-none absolute inset-y-0 right-0
                                                            flex items-center pr-2"
                                                        >
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            className="absolute mt-10 max-h-60 w-full overflow-auto
                                                            rounded-md bg-white py-1 text-base shadow-lg ring-1
                                                            ring-black/5 focus:outline-none sm:text-sm"
                                                            style={{zIndex: 1}}
                                                        >
                                                            {majors?.map((major) => (
                                                                <Listbox.Option
                                                                    key={selectedCollege + major}
                                                                    className={({active}) =>
                                                                        `relative cursor-default select-none py-2 pl-10 
                                                                        pr-4 ${ active ? 'bg-teal-600 text-white' 
                                                                            : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={major}
                                                                >
                                                                    {({selected}) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${
                                                                                    selected ? 'font-medium' 
                                                                                        : 'font-normal'
                                                                                }`}
                                                                            >
                                                                                {major}
                                                                            </span>
                                                                            {selected ? (
                                                                                <span
                                                                                    className="absolute inset-y-0
                                                                                    left-0 flex items-center pl-3"
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="pt-8 text-left">
                                    <h2 className="text-gray-400">
                                        Optional
                                    </h2>
                                </div>
                                <div
                                    className="flex flex-wrap text-left mx-auto bg-gray-200 dark:bg-slate-600
                                    rounded-md text-balance pb-4 px-2 my-2"
                                >
                                    <div className="flex-col pt-2 px-2 lg:px-0 lg:pr-1 w-full lg:w-1/3">
                                        <h2 className="pl-2">
                                            Gender
                                        </h2>
                                        <Controller
                                            name="gender"
                                            rules={{required: false}}
                                            control={control}
                                            render={({field: {onChange}}) => (
                                                <Listbox value={selectedGender} onChange={(event => {
                                                    setSelectedGender(event);
                                                    onChange(event);
                                                })}>
                                                    <div className="relative flex w-full mt-1">
                                                        <Listbox.Button
                                                            className="flex relative w-full py-2 pl-3 pr-10 text-sm
                                                            leading-5 text-gray-900 focus:ring-0cursor-default
                                                            rounded-lg bg-white text-left shadow-md focus:outline-none
                                                            focus-visible:ring-2 focus-visible:ring-white/75
                                                            focus-visible:ring-offset-2
                                                            focus-visible:ring-offset-teal-300 sm:text-sm"
                                                        >
                                                            <span className="block truncate">{selectedGender}</span>
                                                            <span
                                                                className="pointer-events-none absolute inset-y-0
                                                                right-0 flex items-center pr-2"
                                                            >
                                                                <ChevronUpDownIcon
                                                                    className="h-5 w-5 text-gray-400"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                className="absolute mt-10 max-h-60 w-full overflow-auto
                                                                rounded-md bg-white py-1 text-base shadow-lg ring-1
                                                                ring-black/5 focus:outline-none sm:text-sm"
                                                                style={{zIndex: 1}}>
                                                                {genders.map((gender) => (
                                                                    <Listbox.Option
                                                                        key={gender}
                                                                        className={({active}) =>
                                                                            `relative cursor-default select-none py-2 
                                                                            pl-10 pr-4 ${ active 
                                                                                ? 'bg-teal-600 text-white' 
                                                                                : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={gender}
                                                                    >
                                                                        {({selected}) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${
                                                                                        selected ? 'font-medium' 
                                                                                            : 'font-normal'
                                                                                    }`}
                                                                                >
                                                                                  {gender}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className="absolute inset-y-0
                                                                                        left-0 flex items-center pl-3"
                                                                                    >
                                                                                        <CheckIcon
                                                                                            className="h-5 w-5"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            )}
                                        />
                                    </div>
                                    <div className="flex-col pt-2 px-2 lg:px-1 w-full lg:w-1/3">
                                        <h2 className="pl-2">
                                            Family Income
                                        </h2>
                                        <div>
                                            <div className="relative w-full mt-1 rounded-lg shadow-md">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 flex
                                                    items-center pl-3"
                                                >
                                                    <span className="text-gray-500 sm:text-sm">$</span>
                                                </div>
                                                <Controller
                                                    name="income"
                                                    rules={{required: false}}
                                                    control={control}
                                                    render={({field: {onChange}}) => (
                                                        <input
                                                            onChange={onChange}
                                                            type="text"
                                                            name="income"
                                                            id="income"
                                                            className="block w-full rounded-lg border-0 py-1.5 pl-7
                                                            pr-20 text-base text-gray-900 placeholder:text-gray-400
                                                            focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="0.00"
                                                        />
                                                    )}
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center h-full
                                                    rounded-md border-0 bg-transparent"
                                                >
                                                    <span className="text-gray-500 sm:text-sm">USD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-between pt-2 px-2 lg:px-0 lg:pl-1 w-full lg:w-1/3">
                                        <div className="flex justify-between w-full pl-2">
                                            <span className="w-full text-left">
                                                First-Gen Student?
                                            </span>
                                            <button
                                                type="button"
                                                className="text-right text-blue-500 whitespace-nowrap"
                                                onClick={() => setFirstGenDialogBoxOpen(true)}
                                            >
                                                <span>
                                                    What&apos;s that?
                                                </span>
                                            </button>
                                        </div>
                                        <Controller
                                            name="firstGen"
                                            rules={{required: false}}
                                            control={control}
                                            render={({field: {onChange}}) => (
                                                <Listbox value={selectedFirstGen} onChange={(event) => {
                                                    setSelectedFirstGen(event);
                                                    onChange(event);
                                                }}>
                                                    <div className="relative flex w-full mt-1">
                                                        <Listbox.Button
                                                            className="flex relative w-full py-2 pl-3 pr-10 text-sm
                                                            leading-5 text-gray-900 focus:ring-0cursor-default
                                                            rounded-lg bg-white text-left shadow-md focus:outline-none
                                                            focus-visible:ring-2 focus-visible:ring-white/75
                                                            focus-visible:ring-offset-2
                                                            focus-visible:ring-offset-teal-300 sm:text-sm"
                                                        >
                                                            <span className="block truncate">{selectedFirstGen}</span>
                                                            <span
                                                                className="pointer-events-none absolute inset-y-0
                                                                right-0 flex items-center pr-2"
                                                            >
                                                                <ChevronUpDownIcon
                                                                    className="h-5 w-5 text-gray-400"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                className="absolute mt-10 max-h-60 w-full overflow-auto
                                                                rounded-md bg-white py-1 text-base shadow-lg ring-1
                                                                ring-black/5 focus:outline-none sm:text-sm"
                                                                style={{zIndex: 1}}>
                                                                {firstGen.map((option) => (
                                                                    <Listbox.Option
                                                                        key={option}
                                                                        className={({active}) =>
                                                                            `relative cursor-default select-none py-2 
                                                                            pl-10 pr-4 ${ active 
                                                                                ? 'bg-teal-600 text-white' 
                                                                                : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={option}
                                                                    >
                                                                        {({selected}) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${
                                                                                        selected 
                                                                                            ? 'font-medium' 
                                                                                            : 'font-normal'
                                                                                    }`}
                                                                                >
                                                                                    {option}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className="absolute inset-y-0
                                                                                        left-0 flex items-center pl-3
                                                                                        text-amber-600"
                                                                                    >
                                                                                        <CheckIcon
                                                                                            className="h-5 w-5"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-4">
                        <button
                            type="submit"
                            className="bg-sky-600 hover:bg-sky-300 text-white font-bold py-1 px-3 rounded-full"
                        >
                            Get Scores
                        </button>
                    </div>
                </form>
                : null
            }
            {submitButtonClicked && Object.keys(moneyScore).length == 0 ?
                <div role="status" className="flex justify-center pt-6">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0
                            22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144
                            50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186
                            50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144
                            50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871
                            24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194
                            63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613
                            1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                            10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457
                            70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997
                            32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : null
            }
            {Object.keys(moneyScore).length > 0 ?
                <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200
                        shadow-xl border border-solid dark:border-black rounded-xl px-1 pt-6 mx-4 mt-6">
                    <div className="flex flex-wrap justify-center text-center">
                        <div
                            className="flex flex-wrap w-full justify-center border border-solid border-black
                            dark:border-white rounded-xl mx-2 px-1 py-2 text-wrap break-words"
                        >
                            <div className="w-full lg:w-1/2">
                                <h2 className="font-bold w-full">{moneyScore?.school}</h2>
                                <span className="w-full pt-2 lg:pt-0">
                                    {moneyScore?.city + ", " + moneyScore?.state + " " + moneyScore?.zip}
                                </span>
                            </div>
                            <div className="pt-4 lg:pt-0 px-2 lg:px-0 w-full lg:w-1/2">
                                <div className="w-full">
                                    <span>
                                        {
                                            moneyScore?.website
                                                ? linkFormatter(moneyScore.website)?.map(link => {
                                                    return (
                                                        <div key={link}>
                                                            <span>
                                                                <a href={link}>
                                                                    {link}
                                                                </a>
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </span>
                                </div>
                                <div className="w-full">
                                    <span>
                                        {
                                            moneyScore?.netPriceCalculators
                                                ? linkFormatter(moneyScore.netPriceCalculators)?.map(link => {
                                                    return (
                                                        <div key={link}>
                                                            <span>
                                                                <a href={link}>
                                                                    {link}
                                                                </a>
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="hidden lg:flex justify-center max-w-3xl w-full bg-gray-200 dark:bg-slate-800
                            shadow-xl border border-solid dark:border-black rounded-lg my-8 py-8 sm:px-0"
                        >
                            <div className="flex-wrap justify-center w-full px-4">
                                <div className="w-full">
                                    <ScoreBarChart data={Object.values(scores)}/>
                                </div>
                                <div className="flex justify-between w-full text-center text-xs text-gray-600
                                dark:text-gray-400"
                                >
                                    <div className="w-1/12"/>
                                    <div className="w-1/4">
                                        {scores?.IncomeScore?.message}
                                    </div>
                                    <div className="w-1/4">
                                        {scores?.NetScore?.message}
                                    </div>
                                    <div className="w-1/4">
                                        {scores?.DebtScore?.message}
                                    </div>
                                    <div className="w-1/12"/>
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden w-full max-w-md px-2 py-8 sm:px-0">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 border-solid dark:border-black rounded-xl
                                bg-gray-200 dark:bg-sky-950 p-1">
                                    {Object.keys(scores).map((category) => (
                                        <Tab
                                            key={category}
                                            className={({selected}) => {
                                                return selected
                                                    ? "w-full rounded-lg py-2.5 text-sm font-medium leading-5 " +
                                                    "ring-white/60 ring-offset-2 ring-offset-blue-400 " +
                                                    "focus:outline-none focus:ring-2 bg-white text-sky-700 shadow"
                                                    : "w-full rounded-lg py-2.5 text-sm font-medium leading-5 " +
                                                    "ring-white/60 ring-offset-2 ring-offset-blue-400 " +
                                                    "focus:outline-none focus:ring-2 text-sky-400 dark:text-white " +
                                                    "hover:bg-white/[0.12] hover:text-sky-400"
                                            }}
                                        >
                                            {category}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    {Object.values(scores).map((data, idx) => (
                                        <Tab.Panel
                                            key={"tab-panel" + idx}
                                            className="border-solid dark:border-black rounded-xl text-white bg-gray-200
                                            dark:bg-sky-950 p-3 ring-white/60 ring-offset-2 ring-offset-blue-400
                                            focus:outline-none focus:ring-2"
                                        >
                                            <div className="flex justify-center">
                                                <div className="flex-wrap justify-center">
                                                    <div className="flex justify-center w-full">
                                                        <div className="w-3/5">
                                                            <ScoreBarChart data={[data]}/>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center w-full">
                                                        <span
                                                            className="w-3/5 text-center text-gray-600
                                                            dark:text-gray-400 text-sm"
                                                        >
                                                            {data.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div> : null
            }
        </div>
    )
}