import React, {FC, memo, useEffect, useState} from 'react';
import {Button} from "../../../../ui";
import style from "../Styles.module.scss";
import {IQuestionPassing} from "../PassingTestLayout/PassingTestLayout";

interface INavPanelProps {
    questionsNumbers: IQuestionPassing[];
    currentQuestion: number;
    onToggleQuestion: (index: number) => void
}

export const NavPanel: FC<INavPanelProps> = memo(({
                                                 questionsNumbers,
                                                 onToggleQuestion,
                                                 currentQuestion,
}) => {

    return (
        <div className={style.navPanel}>
            {questionsNumbers.map(({id, isComplete}, index) =>
                <Button
                    key={id}
                    onClick={() => onToggleQuestion(index)}
                    className={index === currentQuestion ? style.selectedButton : isComplete ? style.completeButton : undefined}
                >
                    {index + 1}
                </Button>
            )}
        </div>
    );
});
