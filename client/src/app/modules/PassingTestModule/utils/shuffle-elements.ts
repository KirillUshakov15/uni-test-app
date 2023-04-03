import {IQuestion} from "../../../models/ITest";
import {IQuestionPassing} from "../components/PassingTestLayout/PassingTestLayout";

export default function (questions: IQuestion[]): IQuestionPassing[]{
    const passQuestions = questions.map(question => {
        return {...question, isComplete: false}
    })
    return passQuestions.sort(() => Math.random() - 0.5);
}