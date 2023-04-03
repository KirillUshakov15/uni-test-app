import React, {FC, memo, useEffect} from 'react';
import useTimer from "../../hooks/useTimer";

interface IProps {
    minutesCount: number;
    onFinish: () => void
}

export const CountDownTimer: FC<IProps> = memo(({minutesCount, onFinish}) => {
    const {hours, minutes, seconds, timeElapsed} = useTimer(minutesCount)

    useEffect(() => {
        if(timeElapsed) onFinish();
    }, [timeElapsed]);

    if(timeElapsed){
        return (
            <div>Время истекло</div>
        )
    }

    return (
        <div>
            {`Оставшееся время: ${hours}:${minutes}:${seconds}`}
        </div>
    );
});
