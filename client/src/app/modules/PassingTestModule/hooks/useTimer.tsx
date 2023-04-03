import {useEffect, useRef, useState} from "react";

export default function (minutesCount: number){
    const interval = useRef<NodeJS.Timeout>()

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [timeElapsed, setTimeElapsed] = useState<boolean>(false)

    const setDeadline = (minutes: number) => {
        const date = new Date();
        date.setMinutes(new Date().getMinutes() + minutes);
        return date;
    }

    const deadline = setDeadline(minutesCount);

    const calculateRemainingTime = () => {
        const time = deadline.getTime() - Date.now();

        if(time <= 0){
            return setTimeElapsed(true);
        }

        setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));

        return time
    }

    useEffect(() => {
        if(timeElapsed) clearInterval(interval.current);

        interval.current = setInterval(() => {
           calculateRemainingTime()
        }, 1000);

        return () => clearInterval(interval.current);
    }, [minutesCount]);

    return {hours, minutes, seconds, timeElapsed}
};
