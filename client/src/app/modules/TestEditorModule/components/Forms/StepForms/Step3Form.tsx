import React, {memo, useContext} from 'react';
import style from "./StepForms.module.scss";
import {Card, Divider, Slider} from "../../../../../ui";
import {CreateTestDataContext} from "../../TestEditorLayout";

const Step3Form = memo(() => {
    const {data, setData} = useContext(CreateTestDataContext);

    const handleChangeMarks = (e: React.ChangeEvent<HTMLInputElement>) => {
       const value = parseInt(e.target.value)

        switch (e.target.name){
            case "excellent-mark-slider": {
                if(value > data.marks.good && value < 100)
                    setData({...data, marks: {...data.marks, excellent: value}})
                break;
            }
            case "good-mark-slider": {
                if(value < data.marks.excellent && value > data.marks.normal)
                    setData({...data, marks: {...data.marks, good: value}})
                break;
            }
            case "normal-mark-slider": {
                if(value < data.marks.good - 1)
                    setData({...data, marks: {...data.marks, normal: value}})
                break;
            }
        }
    }

    return (
        <div className={style.content}>
            <Card width={600}>
                <h4>Критерии оценивания*</h4>
                <p>*Укажите критерии оценивания, отрегулировав соответствующие ползунки</p>
                <div className={style.slidersContainer}>
                    <Slider
                        value={data.marks.excellent}
                        name="excellent-mark-slider"
                        onChange={handleChangeMarks}
                        label={`Оценка "отлично": от ${data.marks.excellent}% и выше`}
                    />
                    <Slider
                        value={data.marks.good}
                        name="good-mark-slider"
                        onChange={handleChangeMarks}
                        label={`Оценка "хорошо": от ${data.marks.good} до ${data.marks.excellent - 1}%`}
                    />
                    <Slider
                        value={data.marks.normal}
                        name="normal-mark-slider"
                        onChange={handleChangeMarks}
                        label={`Оценка "удовлетворительно": от ${data.marks.normal} до ${data.marks.good - 1}%`}
                    />
                </div>
                <h4>Ограничение по времени*</h4>
                <p>*Укажите временное ограничение на выполнение теста</p>
                <div className={style.slidersContainer}>
                    <Slider
                        value={data.timeForPass}
                        name="normal-mark-slider"
                        max={120}
                        step={5}
                        onChange={e => setData({...data, timeForPass: parseInt(e.target.value)})}
                        label={data.timeForPass > 0
                            ? `Время на выполнение: ${data.timeForPass} мин`
                            : `Без ограничения по времени`
                        }
                    />
                </div>
                <Divider/>
            </Card>
        </div>
    );
});

export default Step3Form;