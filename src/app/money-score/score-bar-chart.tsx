import React, {useId} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer, Rectangle
} from 'recharts';
import {BarRectangleItem} from "recharts/types/cartesian/Bar";

export default function ScoreBarChart({data}: {data: any[]}) {

    const formatYAxis = (tick: number, scale: any[]) => {
        if (tick === 100) return scale !== null ? scale[0] : ""
        else if (tick === 0) return scale != null ? scale[1] : ""
        else return ""
    }

    const determineFillColor = (score: number) => {
        const red = score <= 50 ? 255 : (1 - (score - 50) / 50) * 255;
        const green = score >= 50 ? 255 : score / 50 * 255;
        const blue = 75;
        return "#" + (1 << 24 | Math.round(red) << 16 | Math.round(green) << 8 | blue)
            .toString(16).slice(1);
    }

    function BarGradient(props: BarRectangleItem) {
        const id = useId();
        const gradientId = `gradient-${id}`;
        const clipPathId = `clipPath-${id}`;

        return (
            <>
                <defs key={"linear-gradient-"}>
                    <linearGradient id={gradientId} x1="0%" y1="100%" x2="40%" y2="0%">
                        <stop offset="0%" stopColor="#0284c7"/>
                        <stop offset="60%" stopColor={props.color}/>
                    </linearGradient>
                    <clipPath id={clipPathId}>
                        <Rectangle
                            radius={[15, 15, 0, 0]}
                            {...props}
                        />
                    </clipPath>
                </defs>
                <rect
                    x={props.x}
                    width={props.width}
                    height={props.background?.height}
                    fill={`url(#${gradientId})`}
                    y={props.background?.y}
                    clipPath={`url(#${clipPathId})`}
                />
            </>
        );
    }

    return (
        <ResponsiveContainer width="100%" aspect={data.length > 1 ? 2 : 2 / 3}>
            <BarChart {...{overflow: 'visible'}} width={150} height={40} data={data}>
                {data.length === 1 ?
                    <XAxis tickLine={false} tick={false} /> : null
                }
                {data.length === 3 ?
                    <XAxis dataKey="name" stroke="#6b7280" fontWeight={700} tickLine={false} /> : null
                }
                <YAxis yAxisId={0}
                       domain={[0, 100]}
                       orientation="left"
                       stroke="#6b7280"
                       tick={{fill: '#6b7280', fontWeight: 500}}
                       tickFormatter={(tick) => formatYAxis(tick, data[0].scale)}
                />
                {data.length === 3 ?
                    <YAxis yAxisId={1}
                           domain={[0, 100]}
                           orientation="right"
                           stroke="#6b7280"
                           tick={{fill: '#6b7280', fontWeight: 500}}
                           tickFormatter={(tick) => formatYAxis(tick, data[2].scale)}
                    /> : null
                }
                <Bar
                    animationDuration={2000}
                    dataKey="score"
                    label={{
                        position: 'insideTop',
                        fontWeight: 700,
                        fill: 'black',
                    }}
                    shape={(props: { [key: string]: any }) =>
                        <BarGradient {...props} color={determineFillColor(props.score)}/>}
                    activeBar={(props: { [key: string]: any }) =>
                        <BarGradient {...props} color={determineFillColor(props.score)}/>}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}