'use client';
import Multiselect from 'multiselect-react-dropdown';
import {useState} from "react";

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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Multiselect
                className="multiselect"
                isObject={false}
                options={colleges}
                onKeyPressFn={function noRefCheck() {}}
                onRemove={handleChangeMultiselect}
                onSelect={handleChangeMultiselect}
            />
            <button onClick={getCalculatedRate}>Get Calculated Rate</button>
            {calculatedRate > 0 ?
            <div>
                <span>Calculated Rate: {calculatedRate}%</span>
            </div> : null}
        </main>
    );
}
