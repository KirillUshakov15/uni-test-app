import {useState} from "react";

export default function (){
    const [limit, setLimit] = useState<number>(3);
    const [mark, setMark] = useState<string>('');
    const [group, setGroup] = useState<number | null>(null);
    const [timeForPass, setTime] = useState<number>(0);
    const [university, setUniversity] = useState<number | null>(null);
    const [role, setRole] = useState<string>('');
    const [hasAccess, setHasAccess] = useState<string>('')

    return {
        limit, setLimit,
        mark, setMark,
        group, setGroup,
        timeForPass, setTime,
        university, setUniversity,
        role, setRole,
        hasAccess, setHasAccess
    }
}