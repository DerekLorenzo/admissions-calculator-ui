'use client';
import React from "react";
import { ChartBarIcon, ListBulletIcon, PhotoIcon, Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/20/solid'

export default function Home() {
    if (typeof window !== "undefined") if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2
                lg:items-start lg:gap-y-10">
                <div
                    className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl
                    lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-indigo-600">
                                Calculate Financial Outcomes
                            </p>
                            <a href="/money-score">
                                <h1
                                    className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300
                                    sm:text-4xl"
                                >
                                    MoneyScore
                                </h1>
                            </a>
                            <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-400">
                                MoneyScore is a tool that compares income and debt outcomes for recent graduates in
                                comparison to other institutions by factors including major, gender, family-income,
                                and family education history.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden lg:flex justify-start -ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2
                    lg:row-span-2 lg:row-start-1 overflow-hidden"
                >
                    <a href="/money-score">
                        <img
                            className="w-[48rem] h-[40rem] object-cover object-left-top max-w-none rounded-xl
                            bg-gray-900 shadow-xl ring-1 ring-gray-400/10
                            sm:w-[57rem]"
                            src="/money_score_ui.png"
                            alt="Screenshot of MoneyScore page"
                        />
                    </a>
                </div>
                <div
                    className="flex lg:hidden justify-center -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2
                    lg:row-span-2 lg:row-start-1 overflow-hidden">
                    <a href="/money-score">
                        <img
                            className="ax-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
                            src="/money_score_ui_mobile.png"
                            alt="Screenshot of MoneyScore page"
                        />
                    </a>
                </div>
                <div
                    className="lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl
                    lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 dark:text-gray-400 lg:max-w-lg">
                            <p>
                                MoneyScore uses data from the U.S. Department of Education&apos;s College Scorecard to
                                compare various income and debt outcomes to the income and debt outcomes of other
                                U.S.-based institutions given a personalized set of parameters.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600 dark:text-gray-500">
                                <li className="flex gap-x-3">
                                    <UserCircleIcon className="mt-1 h-5 w-5 flex-none text-indigo-600"
                                                      aria-hidden="true"/>
                                    <span>
                                        <strong className="font-semibold text-gray-900 dark:text-gray-300">
                                            Personalize your results.
                                        </strong>
                                        &nbsp;Whether you&apos;re interested in comparing outcomes by school only or by
                                        more personal criteria such as gender or family income, either is possible
                                        with MoneyScore.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <PhotoIcon className="mt-1 h-5 w-5 flex-none text-indigo-600"
                                                    aria-hidden="true"/>
                                    <span>
                                        <strong className="font-semibold text-gray-900 dark:text-gray-300">
                                            Fuller view.
                                        </strong>
                                        &nbsp;Compare income, debt, and combined ratings together for a more complete
                                        picture.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <ChartBarIcon className="mt-1 h-5 w-5 flex-none text-indigo-600"
                                                aria-hidden="true"/>
                                    <span>
                                        <strong className="font-semibold text-gray-900 dark:text-gray-300">
                                            Straightforward ratings.
                                        </strong>
                                        &nbsp;Scores are given on a 0 to 100 scale based on how they compare to other
                                        U.S.-based institutions given the same parameters for a clear and
                                        straightforward comparison.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8">
                                MoneyScore can help prospective students gain a greater understanding of what they
                                can expect both in terms of their potential earnings and the amount of money owed upon
                                graduation from a U.S.-based institution. MoneyScore is ideal as a comparative tool as
                                the scores are determined by how an institution compares to other U.S.-based
                                institutions, given the same parameters. Students may apply a more direct
                                comparison by searching the MoneyScores for different institutions to be compared
                                directly against each other.
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                Undecided?
                            </h2>
                            <p className="mt-6">
                                No matter what stage of the college search you are in, MoneyScore can prove useful.
                                Are you unsure of your major? MoneyScore can deliver results for overall schools,
                                regardless of major, by selecting &quot;Undecided or Not Listed&quot; in the
                                major dropdown.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="pt-16 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none
                lg:grid-cols-2 lg:items-start lg:gap-y-10"
            >
                <div
                    className="lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl
                    lg:gap-x-8 lg:px-8">
                    <div className="lg:pl-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-indigo-600">
                                Estimate Overall Acceptance Chances
                            </p>
                            <a href="/combined-rate-calculator">
                                <h1
                                    className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300
                                    sm:text-4xl"
                                >
                                    CombinedRate
                                </h1>
                            </a>
                            <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-400">
                                CombinedRate generates an estimate of the chances that a typical applicant will be
                                admitted to at least one of the institutions they have applied to from a selected
                                pool of institutions.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden lg:flex justify-start lg:justify-end -ml-12 lg:-ml-0 lg:-mr-12 -mt-12 p-12
                    lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 overflow-hidden"
                >
                    <a href="/combined-rate-calculator">
                        <img
                            className="w-[48rem] h-[40rem] object-cover object-right-top max-w-none rounded-xl
                            bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src="/combined_rate_ui.png"
                            alt="Screenshot of CombinedRate page"
                        />
                    </a>
                </div>
                <div
                    className="flex lg:hidden justify-center -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2
                    lg:row-span-2 lg:row-start-1 overflow-hidden"
                >
                    <a href="/combined-rate-calculator">
                        <img
                            className="ax-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
                            src="/combined_rate_ui_mobile.png"
                            alt="Screenshot of CombinedRate page"
                        />
                    </a>
                </div>
                <div
                    className="lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl
                    lg:gap-x-8 lg:px-8">
                    <div className="lg:pl-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 dark:text-gray-400 lg:max-w-lg">
                            <p>
                                Gaining access to some of the elite or most exclusive institutions can sometimes
                                feel like an impossible task. In 2024, the most exclusive U.S.-based institutions
                                accepted only 1 out of approximately every 25 applicants. However, a typical applicant
                                that applied to all 15 of the most exclusive institutions in the United States would
                                generally have had a greater than not chance of gaining admission to at least one of
                                those institutions. Granted, every student and every school is different. Use
                                CombinedRate to build your ideal list of target institutions with favorable overall
                                admissions odds.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600 dark:text-gray-500">
                                <li className="flex gap-x-3">
                                    <ListBulletIcon className="mt-1 h-5 w-5 flex-none text-indigo-600"
                                                      aria-hidden="true"/>
                                    <span>
                                        <strong className="font-semibold text-gray-900 dark:text-gray-300">
                                            Build your target list.
                                        </strong>
                                        &nbsp;Use CombinedRate to generate a well-distributed list of target
                                        institutions with favorable overall odds.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <Square3Stack3DIcon className="mt-1 h-5 w-5 flex-none text-indigo-600"
                                                    aria-hidden="true"/>
                                    <span>
                                        <strong className="font-semibold text-gray-900 dark:text-gray-300">
                                            Play the numbers game.
                                        </strong>
                                        &nbsp;The more applications you submit, the higher the odds. CombinedRate
                                        will calculate those odds for you.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8">
                                CombinedRate uses data from the U.S. Department of Education&apos;s College Scorecard
                                to ensure accurate admissions rates. Use CombinedRate to confirm your list of applied
                                schools produces generally favorable admissions outcomes or to build a list of target
                                institutions with admissions rates that are both individually competitive but
                                collectively favorable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
