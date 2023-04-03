
export enum Marks{
    EXCELLENT = "Отлично",
    GOOD = "Хорошо",
    NORMAL = "Удовлетворительно",
    BAD = "Неудовлетворительно"
}

export interface IMark{
    id: number;
    testID: number;
    excellent: number;
    good: number;
    normal: number;
}